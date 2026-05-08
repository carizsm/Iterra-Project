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
import { tripTypes } from "@/lib/constants";
import { createTripSchema, type CreateTripInput } from "@/lib/validations/trips";
import { createTripAction, type ActionState } from "./actions";

export function CreateTripForm() {
  const [state, action, pending] = useActionState(createTripAction, {} as ActionState);
  const {
    register,
    formState: { errors },
  } = useForm<CreateTripInput>({
    resolver: zodResolver(createTripSchema) as unknown as Resolver<CreateTripInput>,
    defaultValues: { currency: "IDR", trip_type: "group", target_budget: 0 },
  });

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <FormField label="Nama Trip" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Rinjani Long Weekend" />
      </FormField>
      <FormField label="Destinasi" error={errors.destination?.message}>
        <Input {...register("destination")} placeholder="Lombok, Indonesia" />
      </FormField>
      <FormField label="Tipe Trip" error={errors.trip_type?.message}>
        <Select options={tripTypes} {...register("trip_type")} />
      </FormField>
      <FormField label="Mata Uang" error={errors.currency?.message}>
        <Input {...register("currency")} defaultValue="IDR" />
      </FormField>
      <FormField label="Tanggal Mulai" error={errors.start_date?.message}>
        <Input type="date" {...register("start_date")} />
      </FormField>
      <FormField label="Tanggal Selesai" error={errors.end_date?.message}>
        <Input type="date" {...register("end_date")} />
      </FormField>
      <FormField label="Target Budget" error={errors.target_budget?.message}>
        <CurrencyInput {...register("target_budget")} />
      </FormField>
      <div className="md:col-span-2">
        <FormField label="Deskripsi singkat" error={errors.description?.message}>
          <Textarea {...register("description")} placeholder="Catatan singkat untuk anggota trip." />
        </FormField>
      </div>
      {state.error ? <p className="text-sm font-medium text-red-700 md:col-span-2">{state.error}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Membuat..." : "Buat Trip Baru"}
        </Button>
      </div>
    </form>
  );
}
