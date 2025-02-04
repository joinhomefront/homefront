import type { LoginResponse } from "@homefront/auth";

export interface SessionCredentials {
  username: string;
  password: string;
}

export type SessionResponse =
  | LoginError
  | NeedOtpError
  | {
      success: true;
      user: LoginResponse;
    };

export interface NeedOtpError {
  miniSession: string;
  publicKey: string;
  requiresTwoFactor: true;
}

export interface LoginError {
  error: string;
}

export interface FullSessionResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    emailVerified: Date | null;
    name: string | null;
    image: string | null;
    role: string;
    twoFactorEnabled: boolean;
  };
}
