import { redirect } from "next/navigation";

import { SignInScreen } from "@homefront/app/features/auth/SignInScreen";
import { auth } from "@homefront/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return <SignInScreen />;
}
