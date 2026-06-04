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
      <FormField label="Title" error={errors.title?.message}>
        <Input {...register("title")} placeholder="Arrive at the destination" />
      </FormField>
      <FormField label="Date" error={errors.item_date?.message}>
        <Input type="date" {...register("item_date")} />
      </FormField>
      <FormField label="Start" error={errors.start_time?.message}>
        <Input type="time" {...register("start_time")} />
      </FormField>
      <FormField label="End" error={errors.end_time?.message}>
        <Input type="time" {...register("end_time")} />
      </FormField>
      <FormField label="Location" error={errors.location?.message}>
        <Input {...register("location")} placeholder="Station, airport, or meeting point" />
      </FormField>
      <FormField label="Estimated Cost" error={errors.estimated_cost?.message}>
        <CurrencyInput {...register("estimated_cost")} />
      </FormField>
      <FormField label="Status" error={errors.status?.message}>
        <Select options={itineraryStatuses} {...register("status")} />
      </FormField>
      <div className="md:col-span-2">
        <FormField label="Notes" error={errors.notes?.message}>
          <Textarea {...register("notes")} placeholder="Short details to remember." />
        </FormField>
      </div>
      {state.error ? <p className="text-sm font-medium text-red-700 md:col-span-2">{state.error}</p> : null}
      {state.success ? <p className="text-sm font-medium text-primary md:col-span-2">{state.success}</p> : null}
      <div className="flex justify-end md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Add Itinerary"}
        </Button>
      </div>
    </form>
  );
}
