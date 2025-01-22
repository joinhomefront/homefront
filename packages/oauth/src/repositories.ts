import type {
  GrantIdentifier,
  OAuthAuthCode,
  OAuthAuthCodeRepository,
  OAuthClient,
  OAuthClientRepository,
  OAuthScope,
  OAuthScopeRepository,
  OAuthToken,
  OAuthTokenRepository,
  OAuthUser,
  OAuthUserIdentifier,
  OAuthUserRepository,
} from "@jmondi/oauth2-server";
import {
  DateInterval,
  generateRandomToken,
  OAuthException,
} from "@jmondi/oauth2-server";
import { verify } from "@node-rs/argon2";

import type { NewToken } from "@homefront/db";
import { db } from "@homefront/db";

import { isUserIdValid } from "./utils";

export const oauthUserRepository: OAuthUserRepository = {
  async getUserByCredentials(
    identifier: OAuthUserIdentifier,
    password?: string,
    _grantType?: GrantIdentifier,
    _client?: OAuthClient,
  ): Promise<OAuthUser | undefined> {
    if (typeof identifier !== "string") {
      throw new Error(`id must be of type string, got ${typeof identifier}`);
    }

    const user = await db
      .selectFrom("users")
      .where("id", "=", identifier)
      .selectAll()
      .executeTakeFirst();

    if (!user) {
      return;
    }

    if (password && user.passwordHash) {
      const validPassword = await verify(user.passwordHash, password);
      if (!validPassword) {
        throw new Error("invalid_authentication_credentials");
      }
    }

    return {
      id: user.id,
    };
  },
};

export const oauthAuthCodeRepository: OAuthAuthCodeRepository = {
  async getByIdentifier(authCodeCode: string): Promise<OAuthAuthCode> {
    const authCodeRow = await db
      .selectFrom("authCodes")
      .where("code", "=", authCodeCode)
      .selectAll()
      .executeTakeFirstOrThrow();
    const client = await oauthClientRepository.getByIdentifier(
      authCodeRow.clientId,
    );
    return {
      ...authCodeRow,
      client,
      scopes: authCodeRow.scopes.map((scope) => ({ name: scope })),
    };
  },
  issueAuthCode(
    client: OAuthClient,
    user: OAuthUser | undefined | null,
    scopes: OAuthScope[],
  ): OAuthAuthCode {
    return {
      redirectUri: null,
      code: generateRandomToken(),
      codeChallenge: null,
      codeChallengeMethod: "S256",
      expiresAt: new DateInterval("10m").getEndDate(),
      client,
      user,
      scopes,
    };
  },
  async persist(authCode: OAuthAuthCode): Promise<void> {
    if (!isUserIdValid(authCode.user?.id)) {
      throw new Error(
        `id must be of type string, got ${typeof authCode.user?.id}`,
      );
    }

    await db
      .insertInto("authCodes")
      .values({
        clientId: authCode.client.id,
        code: authCode.code,
        expiresAt: authCode.expiresAt,
        scopes: JSON.stringify(authCode.scopes.map((scope) => scope.name)),
        userId: authCode.user?.id,
        codeChallenge: authCode.codeChallenge,
        codeChallengeMethod: authCode.codeChallengeMethod,
        redirectUri: authCode.redirectUri,
      })
      .onConflict((oc) =>
        oc.column("code").doUpdateSet({
          updatedAt: new Date(),
        }),
      )
      .execute();
  },
  async isRevoked(authCodeCode: string): Promise<boolean> {
    const authCode = await this.getByIdentifier(authCodeCode);
    return new Date() > authCode.expiresAt;
  },
  async revoke(authCodeCode: string): Promise<void> {
    await db
      .updateTable("authCodes")
      .where("code", "=", authCodeCode)
      .set({
        expiresAt: new Date(0),
        updatedAt: new Date(),
      })
      .execute();
  },
};

export const oauthClientRepository: OAuthClientRepository = {
  async getByIdentifier(id: string): Promise<OAuthClient> {
    const client = await db
      .selectFrom("clients")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();
    if (!client) {
      throw OAuthException.invalidClient("Invalid client id");
    }
    return {
      id: client.id,
      secret: client.secret,
      name: client.name,
      allowedGrants: client.allowedGrants,
      redirectUris: client.redirectUris,
      scopes: client.scopes.map((scope) => ({ name: scope })),
    };
  },
  async isClientValid(
    grantType: GrantIdentifier,
    client: OAuthClient,
    clientSecret?: string,
  ): Promise<boolean> {
    if (client.secret && client.secret !== clientSecret) {
      return Promise.resolve(false);
    }
    return Promise.resolve(client.allowedGrants.includes(grantType));
  },
};

export const oauthScopeRepository: OAuthScopeRepository = {
  async getAllByIdentifiers(scopeNames: string[]): Promise<OAuthScope[]> {
    return Promise.resolve(
      scopeNames.map((scopeName) => ({ name: scopeName })),
    );
  },
  async finalize(
    scopes: OAuthScope[],
    _identifier: GrantIdentifier,
    _client: OAuthClient,
    _user_id?: OAuthUserIdentifier,
  ): Promise<OAuthScope[]> {
    return Promise.resolve(scopes);
  },
};

export const oauthTokenRepository: OAuthTokenRepository = {
  async issueToken(
    client: OAuthClient,
    scopes: OAuthScope[],
    user?: OAuthUser | null,
  ): Promise<OAuthToken> {
    return Promise.resolve({
      accessToken: generateRandomToken(),
      accessTokenExpiresAt: new DateInterval("10m").getEndDate(),
      refreshToken: null,
      refreshTokenExpiresAt: null,
      client,
      scopes,
      user,
    });
  },
  async issueRefreshToken(
    token: OAuthToken,
    _client: OAuthClient,
  ): Promise<OAuthToken> {
    token.refreshToken = generateRandomToken();
    token.refreshTokenExpiresAt = new DateInterval("30d").getEndDate();
    await db
      .updateTable("tokens")
      .where("accessToken", "=", token.accessToken)
      .set({
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        updatedAt: new Date(),
      })
      .execute();
    return token;
  },
  async persist(token: OAuthToken): Promise<void> {
    if (!isUserIdValid(token.user?.id)) {
      throw new Error(
        `id must be of type string, got ${typeof token.user?.id}`,
      );
    }

    const values: NewToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: token.client.id,
      scopes: JSON.stringify(token.scopes.map((scope) => scope.name)),
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      userId: token.user?.id,
      updatedAt: new Date(),
    };

    await db
      .insertInto("tokens")
      .values(values)
      .onConflict((oc) => oc.column("accessToken").doUpdateSet(values))
      .execute();
  },
  async revoke(token: OAuthToken): Promise<void> {
    token.accessTokenExpiresAt = new Date(0);
    token.refreshTokenExpiresAt = new Date(0);
    return Promise.resolve();
  },
  async revokeDescendantsOf(_authCodeId: string): Promise<void> {
    await Promise.resolve();
    throw new Error("Method not implemented.");
  },
  async isRefreshTokenRevoked(token: OAuthToken): Promise<boolean> {
    if (!token.refreshTokenExpiresAt) {
      return Promise.resolve(true);
    }
    return Promise.resolve(new Date() > token.refreshTokenExpiresAt);
  },
  async getByRefreshToken(refreshTokenToken: string): Promise<OAuthToken> {
    const token = await db
      .selectFrom("tokens")
      .where("refreshToken", "=", refreshTokenToken)
      .selectAll()
      .executeTakeFirstOrThrow();
    const client = await oauthClientRepository.getByIdentifier(token.clientId);
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client,
      scopes: token.scopes.map((scope) => ({ name: scope })),
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      user: token.userId ? { id: token.userId } : null,
    };
  },
};
