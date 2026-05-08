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
import { itineraryStatuses } from "@/lib/constants";
import { itineraryItemSchema, type ItineraryItemInput } from "@/lib/validations/itinerary";
import { addItineraryAction, type ActionState } from "@/features/trips/actions";

export function ItineraryForm({ tripId }: { tripId: string }) {
  const boundAction = addItineraryAction.bind(null, tripId);
  const [state, action, pending] = useActionState(boundAction, {} as ActionState);
  const {
    register,
    formState: { errors },
  } = useForm<ItineraryItemInput>({
    resolver: zodResolver(itineraryItemSchema) as unknown as Resolver<ItineraryItemInput>,
    defaultValues: { status: "planned", estimated_cost: 0 },
  });

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <FormField label="Judul" error={errors.title?.message}>
        <Input {...register("title")} placeholder="Tiba di destinasi" />
      </FormField>
      <FormField label="Tanggal" error={errors.item_date?.message}>
        <Input type="date" {...register("item_date")} />
      </FormField>
      <FormField label="Mulai" error={errors.start_time?.message}>
        <Input type="time" {...register("start_time")} />
      </FormField>
      <FormField label="Selesai" error={errors.end_time?.message}>
        <Input type="time" {...register("end_time")} />
      </FormField>
      <FormField label="Lokasi" error={errors.location?.message}>
        <Input {...register("location")} placeholder="Stasiun, bandara, atau titik kumpul" />
      </FormField>
      <FormField label="Estimasi Biaya" error={errors.estimated_cost?.message}>
        <CurrencyInput {...register("estimated_cost")} />
      </FormField>
      <FormField label="Status" error={errors.status?.message}>
        <Select options={itineraryStatuses} {...register("status")} />
      </FormField>
      <div className="md:col-span-2">
        <FormField label="Catatan" error={errors.notes?.message}>
          <Textarea {...register("notes")} placeholder="Detail singkat yang perlu diingat." />
        </FormField>
      </div>
      {state.error ? <p className="text-sm font-medium text-red-700 md:col-span-2">{state.error}</p> : null}
      {state.success ? <p className="text-sm font-medium text-primary md:col-span-2">{state.success}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Tambah Itinerary"}
        </Button>
      </div>
    </form>
  );
}
