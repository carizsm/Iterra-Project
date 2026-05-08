"use client";

import { Input } from "@/components/ui/input";

export function CurrencyInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <Input inputMode="numeric" min="0" type="number" step="1000" {...props} />;
}
