"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/common/form-field";
import { tripReviewSchema, type TripReviewInput } from "@/lib/validations/reviews";
import { saveReviewAction, type ActionState } from "@/features/trips/actions";
import type { TripReview } from "@/types/trip";

export function ReviewForm({ tripId, review }: { tripId: string; review: TripReview | null }) {
  const boundAction = saveReviewAction.bind(null, tripId);
  const [state, action, pending] = useActionState(boundAction, {} as ActionState);
  const {
    register,
    formState: { errors },
  } = useForm<TripReviewInput>({
    resolver: zodResolver(tripReviewSchema) as unknown as Resolver<TripReviewInput>,
    defaultValues: {
      rating: review?.rating ?? 8,
      worth_it: review?.worth_it ?? true,
      best_moment: review?.best_moment ?? "",
      biggest_challenge: review?.biggest_challenge ?? "",
      tips: review?.tips ?? "",
      private_notes: review?.private_notes ?? "",
    },
  });

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <FormField label="Rating 1-10" error={errors.rating?.message}>
        <Input type="number" min={1} max={10} {...register("rating")} />
      </FormField>
      <FormField label="Worth it?" error={errors.worth_it?.message}>
        <Select
          options={[
            { value: "true", label: "Ya" },
            { value: "false", label: "Tidak" },
          ]}
          {...register("worth_it")}
        />
      </FormField>
      <FormField label="Momen terbaik" error={errors.best_moment?.message}>
        <Textarea {...register("best_moment")} />
      </FormField>
      <FormField label="Tantangan terbesar" error={errors.biggest_challenge?.message}>
        <Textarea {...register("biggest_challenge")} />
      </FormField>
      <FormField label="Tips untuk trip berikutnya" error={errors.tips?.message}>
        <Textarea {...register("tips")} />
      </FormField>
      <FormField label="Catatan privat" error={errors.private_notes?.message}>
        <Textarea {...register("private_notes")} />
      </FormField>
      {state.error ? <p className="text-sm font-medium text-red-700 md:col-span-2">{state.error}</p> : null}
      {state.success ? <p className="text-sm font-medium text-primary md:col-span-2">{state.success}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Review"}
        </Button>
      </div>
    </form>
  );
}
