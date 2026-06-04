"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/form-field";
import type { AuthState } from "./actions";

type AuthFormValues = {
  full_name?: string;
  email: string;
  password: string;
};

export function AuthForm({
  mode,
  action,
}: {
  mode: "login" | "register";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const {
    register,
    formState: { errors },
  } = useForm<AuthFormValues>();
  const isRegister = mode === "register";

  return (
    <form action={formAction} className="space-y-4">
      {isRegister ? (
        <FormField label="Full Name" error={errors.full_name?.message}>
          <Input
            autoComplete="name"
            {...register("full_name", { required: "Full name is required" })}
          />
        </FormField>
      ) : null}
      <FormField label="Email" error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          {...register("email", { required: "Email wajib diisi" })}
        />
      </FormField>
      <FormField label="Password" error={errors.password?.message}>
        <Input
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          {...register("password", {
            required: "Password wajib diisi",
            minLength: { value: 6, message: "Minimal 6 karakter" },
          })}
        />
      </FormField>
      {state.error ? <p className="text-sm font-medium text-red-700">{state.error}</p> : null}
      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Processing..." : isRegister ? "Register" : "Log In"}
      </Button>
    </form>
  );
}
