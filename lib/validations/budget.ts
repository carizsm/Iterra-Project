import { z } from "zod";

export const budgetItemSchema = z.object({
  name: z.string().min(2, "Nama item wajib diisi"),
  category: z.string().min(2, "Kategori wajib dipilih"),
  estimated_amount: z.coerce.number().min(0, "Estimasi tidak boleh negatif"),
  notes: z.string().optional(),
});

export type BudgetItemInput = z.infer<typeof budgetItemSchema>;
