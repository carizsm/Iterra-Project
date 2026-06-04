import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().min(2, "Expense name is required"),
  category: z.string().min(2, "Category is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  paid_by: z.string().min(1, "Choose who paid"),
  expense_date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
  split_method: z.enum(["equal", "custom"]).default("equal"),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
