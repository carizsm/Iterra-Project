import { z } from "zod";
import { tripTypes } from "@/lib/constants";

export const createTripSchema = z
  .object({
    name: z.string().min(2, "Trip name must be at least 2 characters"),
    destination: z.string().min(2, "Destination is required"),
    trip_type: z.enum(tripTypes.map((type) => type.value) as [string, ...string[]]),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    target_budget: z.coerce.number().min(0, "Budget cannot be negative"),
    currency: z.string().min(3).default("IDR"),
    description: z.string().optional(),
  })
  .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
    message: "End date must be after start date",
    path: ["end_date"],
  });

export const joinTripSchema = z.object({
  invite_code: z.string().min(4, "Invite code is required").max(16),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
