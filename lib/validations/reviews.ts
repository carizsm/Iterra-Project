import { z } from "zod";

export const tripReviewSchema = z.object({
  rating: z.coerce.number().min(1).max(10),
  worth_it: z.coerce.boolean(),
  best_moment: z.string().optional(),
  biggest_challenge: z.string().optional(),
  tips: z.string().optional(),
  private_notes: z.string().optional(),
});

export type TripReviewInput = z.infer<typeof tripReviewSchema>;
