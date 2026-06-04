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
import { expenseSchema, type ExpenseInput } from "@/lib/validations/expenses";
import { addExpenseAction, type ActionState } from "@/features/trips/actions";
import type { TripMember } from "@/types/trip";

export function ExpenseForm({ tripId, members }: { tripId: string; members: TripMember[] }) {
  const boundAction = addExpenseAction.bind(null, tripId);
  const [state, action, pending] = useActionState(boundAction, {} as ActionState);
  const memberOptions = members.map((member) => ({
    value: member.user_id,
    label: member.profiles?.full_name ?? "Member",
  }));
  const {
    register,
    formState: { errors },
  } = useForm<ExpenseInput>({
    resolver: zodResolver(expenseSchema) as unknown as Resolver<ExpenseInput>,
    defaultValues: {
      category: "Transport",
      split_method: "equal",
      paid_by: memberOptions[0]?.value,
    },
  });

  return (
    <form action={action} className="grid gap-4 md:grid-cols-3">
      <FormField label="Expense Name" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Lunch" />
      </FormField>
      <FormField label="Category" error={errors.category?.message}>
        <Select options={budgetCategories} {...register("category")} />
      </FormField>
      <FormField label="Amount" error={errors.amount?.message}>
        <CurrencyInput {...register("amount")} />
      </FormField>
      <FormField label="Paid by" error={errors.paid_by?.message}>
        <Select options={memberOptions} {...register("paid_by")} />
      </FormField>
      <FormField label="Date" error={errors.expense_date?.message}>
        <Input type="date" {...register("expense_date")} />
      </FormField>
      <FormField label="Split Method" error={errors.split_method?.message}>
        <Select
          options={[
            { value: "equal", label: "Equal split" },
            { value: "custom", label: "Custom later" },
          ]}
          {...register("split_method")}
        />
      </FormField>
      <div className="md:col-span-3">
        <FormField label="Notes" error={errors.notes?.message}>
          <Textarea {...register("notes")} placeholder="Optional." />
        </FormField>
      </div>
      {state.error ? <p className="text-sm font-medium text-red-700 md:col-span-3">{state.error}</p> : null}
      {state.success ? <p className="text-sm font-medium text-primary md:col-span-3">{state.success}</p> : null}
      <div className="flex justify-end md:col-span-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Add Expense"}
        </Button>
      </div>
    </form>
  );
}
