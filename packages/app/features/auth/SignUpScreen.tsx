"use client";

import { Suspense } from "react";

import { SignUp } from "@homefront/app/features/auth/SignUp";
import { ActivityIndicator } from "@homefront/ui";

export function SignUpScreen() {
  return (
    <Suspense fallback={<ActivityIndicator size="small" />}>
      <SignUp />
    </Suspense>
  );
}
