import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";
import { AuthForm } from "@/features/auth/auth-form";
import { loginAction } from "@/features/auth/actions";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Logo href="/" className="mb-4" />
          <CardTitle>Log in to Iterra</CardTitle>
          <CardDescription>Manage trips, budgets, and journey notes.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" action={loginAction} />
          <p className="mt-5 text-sm text-muted">
            No account yet?{" "}
            <Link href="/register" className="font-medium text-primary">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
