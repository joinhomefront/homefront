import { getBaseUrl } from "@homefront/app/utils/base-url";

import {
  FullSessionResponse,
  NeedOtpError,
  SessionCredentials,
  SessionResponse,
} from "./types";

interface StorageUtility {
  get(key: string): string | null;
  set(key: string, value: string): Promise<boolean> | boolean;
  remove(key: string): void;
  refresh(): Promise<void>;
}

export class LocalStorageUtility implements StorageUtility {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  }

  async set(key: string, value: string): Promise<boolean> {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error("Error setting localStorage:", error);
      return false;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  async refresh(): Promise<void> {
    // No refresh needed for localStorage. This method is included for compatibility.
    return;
  }
}

class Base64Encoder {
  static encode(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i] ?? 0);
    }
    return btoa(binary);
  }
}

export class RequestSignUtil {
  static SIGNING_ALGORITHM = "SECP256R1";
  static REQUEST_SIGN_KEY = "request_sign_key";
  static keyPair: any;
  static tempKeyPair: any;
  static enableReuseRequestSigningKeyInSessionHandOff = false;

  // Static dependencies
  static storage: StorageUtility = new LocalStorageUtility();

  static compressEcKey(uncompressedKey: ArrayBuffer): ArrayBuffer {
    const keyBytes = new Uint8Array(uncompressedKey);
    const byteLength = keyBytes.byteLength;
    const halfLength = (1 + byteLength) >>> 1;
    const compressed = keyBytes.slice(0, halfLength);
    if (compressed.length > 0 && byteLength > 0) {
      const lastByte = keyBytes[byteLength - 1];
      if (lastByte !== undefined) {
        compressed[0] = 2 | (1 & lastByte);
      }
    }
    return compressed.buffer;
  }

  static getStatus() {
    const { keyPair, tempKeyPair } = RequestSignUtil;
    const storedKeyData = RequestSignUtil.storage.get(
      RequestSignUtil.REQUEST_SIGN_KEY,
    );
    const halfLength = storedKeyData ? Math.floor(storedKeyData.length / 2) : 0;

    return {
      public: keyPair?.publicKey,
      rawPrivateJwkString: keyPair?.rawPrivateJwkString
        ? keyPair.rawPrivateJwkString.slice(0, halfLength)
        : undefined,
      storedKey: storedKeyData ? storedKeyData.slice(0, halfLength) : undefined,
      comparison: keyPair?.rawPrivateJwkString === storedKeyData,
      tempPublic: tempKeyPair?.publicKey,
      createdTime: keyPair?.createdTime,
      savedTime: keyPair?.savedTime,
      noUserConsent: keyPair?.noUserConsent,
    };
  }

  static getPublicKey(): ArrayBuffer | null {
    if (
      RequestSignUtil.keyPair &&
      RequestSignUtil.keyPair.publicKey &&
      RequestSignUtil.keyPair.rawPrivateJwkString ===
        RequestSignUtil.storage.get(RequestSignUtil.REQUEST_SIGN_KEY)
    ) {
      return RequestSignUtil.keyPair.publicKey;
    }
    return null;
  }

  static async createECKeyPair(
    reuseFlag: boolean = false,
  ): Promise<ArrayBuffer | null> {
    RequestSignUtil.enableReuseRequestSigningKeyInSessionHandOff = reuseFlag;
    const existingPublicKey = RequestSignUtil.getPublicKey();
    if (existingPublicKey) return existingPublicKey;

    if (reuseFlag) {
      const syncedPublicKey = await RequestSignUtil.getSyncedPublicKey();
      if (syncedPublicKey) return syncedPublicKey;
    }

    let errorStack = "Key generation failed:";

    try {
      let newKeyPair;
      try {
        newKeyPair = await RequestSignUtil.generateECKeyPair(false, reuseFlag);
      } catch (error) {
        errorStack += " generateECKeyPair failed.";
        newKeyPair = await RequestSignUtil.generateECKeyPair(true, reuseFlag);
      }

      RequestSignUtil.tempKeyPair = newKeyPair;
      return newKeyPair.publicKey;
    } catch (error) {
      RequestSignUtil.tempKeyPair = null;
      RequestSignUtil.keyPair = null;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `${RequestSignUtil.SIGNING_ALGORITHM} Key generation failed.`,
        {
          extras: { message: errorMessage, stack: errorStack },
        },
      );
    }
    return null;
  }

  static async getSyncedPublicKey(): Promise<ArrayBuffer | null> {
    try {
      const privateKey = await RequestSignUtil.getPrivateKey();
      const publicKey = RequestSignUtil.getPublicKey();
      if (privateKey && publicKey) return publicKey;
      return null;
    } catch {
      return null;
    }
  }

  static async generateECKeyPair(
    reportErrors: boolean = false,
    wrapKeys: boolean = false,
  ): Promise<any> {
    let debugDetails = "details: ";
    try {
      const cryptoKeyPair = await window.crypto.subtle.generateKey(
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign"],
      );

      debugDetails += " key generated.";
      if (
        !cryptoKeyPair ||
        !cryptoKeyPair.publicKey ||
        !cryptoKeyPair.privateKey
      ) {
        throw new Error("Key not present");
      }
      debugDetails += " key exists.";

      const rawPublicKey = await window.crypto.subtle.exportKey(
        "raw",
        cryptoKeyPair.publicKey,
      );
      debugDetails += " public key exported.";
      const compressedPublicKey = Base64Encoder.encode(
        RequestSignUtil.compressEcKey(rawPublicKey),
      );
      debugDetails += " key compressed.";

      const jwkPrivateKey = await window.crypto.subtle.exportKey(
        "jwk",
        cryptoKeyPair.privateKey,
      );
      debugDetails += " private key exported.";

      const rawPrivateJwkString = wrapKeys
        ? JSON.stringify({
            privateKey: jwkPrivateKey,
            publicKey: compressedPublicKey,
          })
        : JSON.stringify(jwkPrivateKey);

      debugDetails += " keyPair created.";

      return {
        privateKey: cryptoKeyPair.privateKey,
        publicKey: compressedPublicKey,
        rawPrivateJwkString,
        keyType: RequestSignUtil.SIGNING_ALGORITHM,
        createdTime: Date.now(),
        savedTime: null,
        noUserConsent: false,
      };
    } catch (error) {
      if (reportErrors) {
        console.error("Key generation failed details.", {
          extras: { message: debugDetails },
        });
      }
      throw error;
    }
  }

  static async saveInLocalStorage(
    refreshAfterSave: boolean = false,
  ): Promise<void> {
    const currentKeyPair =
      RequestSignUtil.tempKeyPair || RequestSignUtil.keyPair;
    if (!currentKeyPair) return;

    try {
      const saveResult = await RequestSignUtil.storage.set(
        RequestSignUtil.REQUEST_SIGN_KEY,
        currentKeyPair.rawPrivateJwkString,
      );

      if (refreshAfterSave) {
        await RequestSignUtil.storage.refresh();
        currentKeyPair.noUserConsent = true;
      }

      const storedValue = RequestSignUtil.storage.get(
        RequestSignUtil.REQUEST_SIGN_KEY,
      );
      if (storedValue !== currentKeyPair.rawPrivateJwkString) {
        console.warn("Key not saved in local storage.", {
          extras: { result: saveResult, status: RequestSignUtil.getStatus() },
        });
      }

      if (!saveResult) {
        const retryResult = await RequestSignUtil.storage.set(
          RequestSignUtil.REQUEST_SIGN_KEY,
          currentKeyPair.rawPrivateJwkString,
        );
        console.warn("Key not saved in local storage with retry.", {
          extras: { retryResult, status: RequestSignUtil.getStatus() },
        });
      }

      if (RequestSignUtil.tempKeyPair) {
        RequestSignUtil.keyPair = RequestSignUtil.tempKeyPair;
        RequestSignUtil.keyPair.savedTime = Date.now();
        RequestSignUtil.tempKeyPair = null;
      }
    } catch (error) {
      RequestSignUtil.tempKeyPair = null;
      RequestSignUtil.keyPair = null;
      console.error("Saving key failed.", {
        extras: {
          message: error instanceof Error ? error.message : String(error),
        },
      });
    }
  }

  static deleteKeyFromLocalStorage(): void {
    RequestSignUtil.tempKeyPair = null;
    RequestSignUtil.keyPair = null;
    RequestSignUtil.storage.remove(RequestSignUtil.REQUEST_SIGN_KEY);
  }

  static async getPrivateKey(): Promise<CryptoKey> {
    if (
      RequestSignUtil.keyPair &&
      (RequestSignUtil.keyPair.rawPrivateJwkString ===
        RequestSignUtil.storage.get(RequestSignUtil.REQUEST_SIGN_KEY) ||
        (RequestSignUtil.keyPair.noUserConsent &&
          !RequestSignUtil.storage.get(RequestSignUtil.REQUEST_SIGN_KEY)))
    ) {
      return RequestSignUtil.keyPair.privateKey;
    }

    const storedKeyString = RequestSignUtil.storage.get(
      RequestSignUtil.REQUEST_SIGN_KEY,
    );
    if (storedKeyString == null) {
      console.warn("Key not present to sign the request.", {});
      throw new Error("Key not present");
    }

    const importStartTime = Date.now();

    try {
      const parsedKey = JSON.parse(storedKeyString);
      const jwkPrivateKey = parsedKey.privateKey ?? parsedKey;
      const publicKey = parsedKey.publicKey ?? null;
      const importedPrivateKey = await window.crypto.subtle.importKey(
        "jwk",
        jwkPrivateKey,
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign"],
      );

      const currentTime = Date.now();

      if (RequestSignUtil.keyPair) {
        RequestSignUtil.keyPair.rawPrivateJwkString = storedKeyString;
        RequestSignUtil.keyPair.privateKey = importedPrivateKey;
        RequestSignUtil.keyPair.publicKey = publicKey;
        RequestSignUtil.keyPair.savedTime = currentTime;
        RequestSignUtil.keyPair.noUserConsent = false;
      } else {
        RequestSignUtil.keyPair = {
          privateKey: importedPrivateKey,
          rawPrivateJwkString: storedKeyString,
          publicKey: publicKey,
          keyType: RequestSignUtil.SIGNING_ALGORITHM,
          createdTime: currentTime,
          savedTime: currentTime,
          noUserConsent: false,
        };
      }
    } catch (error) {
      console.error(`${RequestSignUtil.SIGNING_ALGORITHM} Key import failed.`, {
        extras: { error },
      });
      throw error;
    }
    return RequestSignUtil.keyPair.privateKey;
  }

  static async signRequest(data: string): Promise<string> {
    const privateKey = await RequestSignUtil.getPrivateKey();
    const dataBuffer = new TextEncoder().encode(data);
    const signatureBuffer = await window.crypto.subtle.sign(
      { name: "ECDSA", hash: { name: "SHA-256" } },
      privateKey,
      dataBuffer,
    );
    return Base64Encoder.encode(signatureBuffer);
  }

  static async signHttpRequest(
    httpMethod: string,
    url: string,
    headers: Map<string, string>,
    body: string,
  ) {
    // Ensure private key is available based on reuse policy
    if (this.enableReuseRequestSigningKeyInSessionHandOff) {
      try {
        const privateKey = await this.getPrivateKey();
        if (!privateKey) {
          console.warn("Private Key not present to sign http request.");
          return null;
        }
      } catch {
        console.warn("Private Key not present to sign http request.");
        return null;
      }
    } else if (!this.storage.get(this.REQUEST_SIGN_KEY)) {
      console.warn("Key not present to sign http request.", {});
      return null;
    }

    try {
      const coveredComponents = await this.computeCoveredComponents(
        httpMethod,
        url,
        headers,
        body,
      );
      const associatedParams = this.computeAssociatedParameters();
      const signatureParams = this.constructSignatureParams(
        coveredComponents,
        associatedParams,
      );
      const signatureBase = this.constructSignatureBase(
        coveredComponents,
        signatureParams,
      );
      const signatureValue = await this.signRequest(signatureBase);

      return {
        "signature-input": `sig1=${signatureParams}`,
        signature: `sig1=:${signatureValue}:`,
        "content-digest": coveredComponents.get("content-digest"),
        authorization: coveredComponents.get("authorization"),
      };
    } catch (error) {
      console.error("Signing request failed.", {
        extras: { error },
      });
    }
    return null;
  }

  static async computeCoveredComponents(
    method: string,
    url: string,
    headers: Map<string, string>,
    body: string,
  ): Promise<Map<string, string>> {
    const path = url.includes("?") ? url.substring(0, url.indexOf("?")) : url;

    return new Map(
      [
        ["@method", method.toUpperCase()],
        ["@path", path],
        ["authorization", headers.get("authorization")],
        ["content-digest", await this.computeSha256Digest(body)],
        ["content-type", headers.get("Content-Type")],
        ["homefront-account", headers.get("Homefront-Account") ?? ""],
        ["homefront-context", headers.get("Homefront-Context") ?? ""],
      ].filter(([key, value]) => value != null) as [string, string][],
    );
  }

  static async computeSha256Digest(data: string): Promise<string> {
    const dataBuffer = new TextEncoder().encode(data);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", dataBuffer);
    return `sha-256=:${Base64Encoder.encode(hashBuffer)}:`;
  }

  static computeAssociatedParameters(): Map<string, string | number> {
    return new Map<string, string | number>([
      ["created", Math.round(Date.now() / 1000)],
      ["nonce", this.computeNonce()],
    ]);
  }

  static computeNonce(): string {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    return Base64Encoder.encode(randomBytes);
  }

  static constructSignatureParams(
    coveredComponents: Map<string, string>,
    associatedParams: Map<string, any>,
  ): string {
    const componentList = Array.from(coveredComponents.keys())
      .map((header) => `"${header}"`)
      .join(" ");

    const paramsList = Array.from(associatedParams)
      .map(([key, value]) =>
        typeof value === "number" ? `${key}=${value}` : `${key}="${value}"`,
      )
      .join(";");

    return `(${componentList});${paramsList}`;
  }

  static constructSignatureBase(
    coveredComponents: Map<string, string>,
    signatureParams: string,
  ): string {
    const lines: string[] = [];
    coveredComponents.forEach((value, key) => {
      lines.push(`"${key}": ${value}`);
    });
    lines.push(`"@signature-params": ${signatureParams}`);
    return lines.join("\n");
  }

  static async initiateSession(
    credentials: SessionCredentials,
  ): Promise<SessionResponse> {
    // Create new key pair
    const publicKey = await RequestSignUtil.createECKeyPair(true);
    if (!publicKey) {
      throw new Error("Failed to generate key pair");
    }

    // Save the key pair immediately
    await RequestSignUtil.saveInLocalStorage(true);

    const payload = {
      ...credentials,
      publicKey: publicKey,
      signingAlgorithm: RequestSignUtil.SIGNING_ALGORITHM,
    };

    const response = await fetch(`${getBaseUrl()}/api/sessions/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error ?? "An unexpected error occurred",
      };
    }

    return data;
  }

  static handleNeedOtp(response: SessionResponse): NeedOtpError | null {
    if ("requiresTwoFactor" in response) {
      return response as NeedOtpError;
    }
    return null;
  }

  static async submitOtp(
    otp: string,
    miniSession: string,
    additionalHeaders: Record<string, string> = {},
  ): Promise<FullSessionResponse> {
    const url = `${getBaseUrl()}/api/sessions/full`;
    const method = "POST";
    const publicKey = await RequestSignUtil.getPublicKey();
    const body = JSON.stringify({ otp, miniSession, publicKey });

    const headers = new Map<string, string>();
    headers.set("Content-Type", "application/json");
    Object.entries(additionalHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    const signatureHeaders = await this.signHttpRequest(
      method,
      url,
      headers,
      body,
    );

    if (!signatureHeaders) {
      throw new Error("Failed to sign request");
    }

    const finalHeaders: Record<string, string> = {};
    headers.forEach((value, key) => (finalHeaders[key] = value));
    Object.entries(signatureHeaders).forEach(([key, value]) => {
      if (value) finalHeaders[key] = value;
    });

    const response = await fetch(url, {
      method,
      headers: finalHeaders,
      body,
    });

    return response.json();
  }

  static async generateECDHKeyPair(): Promise<CryptoKeyPair> {
    return window.crypto.subtle.generateKey(
      { name: "ECDH", namedCurve: "P-256" },
      true,
      ["deriveKey", "deriveBits"],
    );
  }

  static async deriveSharedSecret(
    privateKey: CryptoKey,
    publicKeyRaw: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    const publicKey = await window.crypto.subtle.importKey(
      "raw",
      publicKeyRaw,
      { name: "ECDH", namedCurve: "P-256" },
      true,
      [],
    );

    return window.crypto.subtle.deriveBits(
      { name: "ECDH", public: publicKey },
      privateKey,
      256,
    );
  }
}
