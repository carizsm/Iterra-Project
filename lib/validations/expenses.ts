import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().min(2, "Nama pengeluaran wajib diisi"),
  category: z.string().min(2, "Kategori wajib dipilih"),
  amount: z.coerce.number().positive("Nominal wajib lebih dari 0"),
  paid_by: z.string().min(1, "Pilih pembayar"),
  expense_date: z.string().min(1, "Tanggal wajib diisi"),
  notes: z.string().optional(),
  split_method: z.enum(["equal", "custom"]).default("equal"),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
