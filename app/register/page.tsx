import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";
import { AuthForm } from "@/features/auth/auth-form";
import { registerAction } from "@/features/auth/actions";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Logo href="/" className="mb-4" />
          <CardTitle>Create an Iterra account</CardTitle>
          <CardDescription>Start a trip workspace with your travel group.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="register" action={registerAction} />
          <p className="mt-5 text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
