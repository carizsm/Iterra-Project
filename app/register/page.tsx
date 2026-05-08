import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/auth-form";
import { registerAction } from "@/features/auth/actions";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Buat akun Iterra</CardTitle>
          <CardDescription>Mulai workspace trip bersama tim perjalananmu.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="register" action={registerAction} />
          <p className="mt-5 text-sm text-muted">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-primary">
              Masuk
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
