import { LoginResponse } from "@homefront/auth";

export interface SessionCredentials {
  username: string;
  password: string;
}

export type SessionResponse =
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
