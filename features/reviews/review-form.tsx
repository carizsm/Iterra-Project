"use client";

import { useActionState, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/common/form-field";
import { cn } from "@/lib/utils";
import { tripReviewSchema, type TripReviewInput } from "@/lib/validations/reviews";
import { saveReviewAction, type ActionState } from "@/features/trips/actions";
import type { TripReview } from "@/types/trip";

export function ReviewForm({ tripId, review }: { tripId: string; review: TripReview | null }) {
  const boundAction = saveReviewAction.bind(null, tripId);
  const [state, action, pending] = useActionState(boundAction, {} as ActionState);
  const {
    register,
    setValue,
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
  const [rating, setRating] = useState(review?.rating ?? 8);
  const [worthIt, setWorthIt] = useState(review?.worth_it ?? true);

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <FormField label="Rating 1-10" error={errors.rating?.message}>
        <input type="hidden" {...register("rating")} value={rating} readOnly />
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setRating(value);
                setValue("rating", value);
              }}
              className={cn(
                "min-h-10 rounded-md border border-border text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-soft",
                rating === value && "border-primary bg-primary text-white hover:bg-primary",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </FormField>
      <FormField label="Worth it?" error={errors.worth_it?.message}>
        <input type="hidden" {...register("worth_it")} value={String(worthIt)} readOnly />
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ].map((option) => (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => {
                setWorthIt(option.value);
                setValue("worth_it", option.value);
              }}
              className={cn(
                "min-h-10 rounded-md border border-border text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-soft",
                worthIt === option.value && "border-primary bg-primary text-white hover:bg-primary",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FormField>
      <FormField label="Best Moment" error={errors.best_moment?.message}>
        <Textarea {...register("best_moment")} />
      </FormField>
      <FormField label="Biggest Challenge" error={errors.biggest_challenge?.message}>
        <Textarea {...register("biggest_challenge")} />
      </FormField>
      <FormField label="Tips for Next Trip" error={errors.tips?.message}>
        <Textarea {...register("tips")} />
      </FormField>
      <FormField label="Private Notes" error={errors.private_notes?.message}>
        <Textarea {...register("private_notes")} />
      </FormField>
      {state.error ? <p className="text-sm font-medium text-red-700 md:col-span-2">{state.error}</p> : null}
      {state.success ? <p className="text-sm font-medium text-primary md:col-span-2">{state.success}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Review"}
        </Button>
      </div>
    </form>
  );
}
