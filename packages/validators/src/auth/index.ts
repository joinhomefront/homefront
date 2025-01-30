import type { TokenEndpointResponse } from "oauth4webapi";
import type { RefinementCtx } from "zod";
import { validateMnemonic } from "bip39";
import { z } from "zod";

import { InviteCodeSchema } from "../invites";
import { serverUsernameSchema, usernameSchema } from "../users";
import { cancelableDebounce } from "../utils";

const debouncedCheckPasswordVulnerability = cancelableDebounce<
  (password: string) => Promise<{ numPwns: number }>
>(
  async (
    signal: AbortSignal,
    password: string,
  ): Promise<{ numPwns: number }> => {
    const res = await fetch(
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/password-vulnerability`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        signal,
      },
    );

    const result = await PasswordVulnerabilityResponseSchema.safeParseAsync(
      await res.json(),
    );

    if (!result.success) {
      throw new Error("Password check failed.");
    }

    return result.data;
  },
  1000,
);

export const PasswordVulnerabilityResponseSchema = z.object({
  numPwns: z.number(),
});

const addIssueForPwnedPassword = (ctx: RefinementCtx, numPwns: number) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: `This password has been found ${numPwns.toLocaleString()} times before in data breaches and should never be used.`,
  });
};

const superRefinePassword = async (password: string, ctx: RefinementCtx) => {
  if (password.length < 8) {
    return z;
  }

  debouncedCheckPasswordVulnerability.cancel();

  try {
    const { numPwns } = await debouncedCheckPasswordVulnerability(password);

    if (numPwns > 0) {
      addIssueForPwnedPassword(ctx, numPwns);
      return z.NEVER;
    }

    return z.OK;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.warn("Password vulnerability check was aborted.");
        return z.OK;
      }

      if (error.message === "Debounced function canceled.") {
        console.warn("Password vulnerability check was canceled.");
        return z.OK;
      }
    }

    console.error("Error checking password vulnerability:", error);
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Could not verify password. Please try again later.",
    });
    return z.NEVER;
  }
};

const basePasswordSchema = z.string().min(8, {
  message:
    "Passwords need to be at least 8 characters. Include multiple words and phrases to make it more secure.",
});

export const passwordSchema =
  basePasswordSchema.superRefine(superRefinePassword);

export const confirmPasswordSchema = z.string();

export const SignUpFormSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignUpRequestSchema = z.object({
  username: serverUsernameSchema,
  password: passwordSchema,
  inviteCode: InviteCodeSchema,
});

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number().optional(),
  id_token: z.string().optional(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
  authorization_details: z
    .array(
      z.object({
        type: z.string(),
        locations: z.array(z.string()).optional(),
        actions: z.array(z.string()).optional(),
        datatypes: z.array(z.string()).optional(),
        privileges: z.array(z.string()).optional(),
        identifier: z.string().optional(),
      }),
    )
    .optional(),
  token_type: z
    .enum(["bearer", "dpop"])
    .transform((val) => val.toLowerCase() as Lowercase<string>),
}) satisfies z.ZodType<TokenEndpointResponse>;

export type TokenResponse = z.infer<typeof TokenResponseSchema>;

export const RecoveryPhraseResponseSchema = z.object({
  recoveryPhrase: z.string(),
});

export type RecoveryPhraseResponse = z.infer<
  typeof RecoveryPhraseResponseSchema
>;

export const ValidateChallengeResponseSchema = z.object({
  success: z.boolean(),
  challenge: z.string(),
});

export const ValidateChangeRequestSchema = z.object({
  action: z.enum([
    "password_update",
    "2fa_enable",
    "2fa_disable",
    "recovery_phrase_update",
  ]),
  type: z.enum(["totp"]),
  content: z.string(),
});

export const ChangePasswordResponseSchema = z.object({
  success: z.boolean(),
});

const currentPasswordSchema = z.string().min(1, "Current password is required");

export const ChangePasswordSchema = z
  .object({
    currentPassword: currentPasswordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ChangePasswordRequestSchema = z.object({
  currentPassword: currentPasswordSchema,
  newPassword: passwordSchema,
  challenge: z.string().min(1, "Challenge is required"),
});

const actionSchema = z.enum([
  "password_update",
  "2fa_enable",
  "2fa_disable",
  "recovery_phrase_update",
]);

export const RecoveryPhraseSchema = z
  .string()
  .refine((phrase) => validateMnemonic(phrase), {
    message: "Invalid recovery phrase",
  });

const totpSchema = z.string().length(6, "Code must be 6 digits");

const OTPChallengeSchema = z.object({
  action: actionSchema,
  type: z.literal("totp"),
  content: totpSchema,
});

const RecoveryPhraseChallengeSchema = z.object({
  action: actionSchema,
  type: z.literal("recovery_phrase"),
  content: RecoveryPhraseSchema,
});

export const ChallengeSchema = z.union([
  OTPChallengeSchema,
  RecoveryPhraseChallengeSchema,
]);

export type Challenge = z.infer<typeof ChallengeSchema>;

export const TwoFactorEnabledResponseSchema = z.object({
  backupCodes: z.array(z.string()),
});

export const TwoFactorDisableRequestSchema = z.object({
  password: z.string().min(1, "Password is required"),
  totp: totpSchema,
});

export const TwoFactorEnableRequestSchema = z.object({
  password: z.string().min(1, "Password is required"),
  totp: totpSchema,
  secret: z.string().length(32, "Invalid secret"),
});

export const BackupCodesResponseSchema = z.object({
  backupCodes: z.array(z.string()),
  success: z.boolean(),
});

export const ChallengeFormSchema = z.object({
  action: z.enum(["password_update"]),
  type: z.enum(["totp"]),
  content: totpSchema,
});
