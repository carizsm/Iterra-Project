import { z } from "zod";

export const budgetItemSchema = z.object({
  name: z.string().min(2, "Item name is required"),
  category: z.string().min(2, "Category is required"),
  estimated_amount: z.coerce.number().min(0, "Estimate cannot be negative"),
  notes: z.string().optional(),
});

export type BudgetItemInput = z.infer<typeof budgetItemSchema>;
