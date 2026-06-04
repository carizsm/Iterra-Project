import { z } from "zod";

export const itineraryItemSchema = z.object({
  title: z.string().min(2, "Title is required"),
  item_date: z.string().min(1, "Date is required"),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  estimated_cost: z.coerce.number().min(0).default(0),
  status: z.enum(["planned", "done", "skipped"]).default("planned"),
});

export type ItineraryItemInput = z.infer<typeof itineraryItemSchema>;
