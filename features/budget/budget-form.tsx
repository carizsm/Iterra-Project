"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyInput } from "@/components/common/currency-input";
import { FormField } from "@/components/common/form-field";
import { budgetCategories } from "@/lib/constants";
import { budgetItemSchema, type BudgetItemInput } from "@/lib/validations/budget";
import { addBudgetItemAction, type ActionState } from "@/features/trips/actions";

export function BudgetForm({ tripId }: { tripId: string }) {
  const boundAction = addBudgetItemAction.bind(null, tripId);
  const [state, action, pending] = useActionState(boundAction, {} as ActionState);
  const {
    register,
    formState: { errors },
  } = useForm<BudgetItemInput>({
    resolver: zodResolver(budgetItemSchema) as unknown as Resolver<BudgetItemInput>,
    defaultValues: { category: "Transportasi", estimated_amount: 0 },
  });

  return (
    <form action={action} className="grid gap-4 md:grid-cols-3">
      <FormField label="Nama Item" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Tiket kereta" />
      </FormField>
      <FormField label="Kategori" error={errors.category?.message}>
        <Select options={budgetCategories} {...register("category")} />
      </FormField>
      <FormField label="Estimasi" error={errors.estimated_amount?.message}>
        <CurrencyInput {...register("estimated_amount")} />
      </FormField>
      <div className="md:col-span-3">
        <FormField label="Catatan" error={errors.notes?.message}>
          <Textarea {...register("notes")} placeholder="Opsional." />
        </FormField>
      </div>
      {state.error ? <p className="text-sm font-medium text-red-700 md:col-span-3">{state.error}</p> : null}
      {state.success ? <p className="text-sm font-medium text-primary md:col-span-3">{state.success}</p> : null}
      <div className="md:col-span-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Tambah Budget Item"}
        </Button>
      </div>
    </form>
  );
}
