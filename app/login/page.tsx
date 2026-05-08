import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/auth-form";
import { loginAction } from "@/features/auth/actions";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Masuk ke Iterra</CardTitle>
          <CardDescription>Kelola trip, budget, dan catatan perjalananmu.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" action={loginAction} />
          <p className="mt-5 text-sm text-muted">
            Belum punya akun?{" "}
            <Link href="/register" className="font-medium text-primary">
              Daftar
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
