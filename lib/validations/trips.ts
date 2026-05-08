import { z } from "zod";
import { tripTypes } from "@/lib/constants";

export const createTripSchema = z
  .object({
    name: z.string().min(2, "Nama trip minimal 2 karakter"),
    destination: z.string().min(2, "Destinasi wajib diisi"),
    trip_type: z.enum(tripTypes.map((type) => type.value) as [string, ...string[]]),
    start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
    end_date: z.string().min(1, "Tanggal selesai wajib diisi"),
    target_budget: z.coerce.number().min(0, "Budget tidak boleh negatif"),
    currency: z.string().min(3).default("IDR"),
    description: z.string().optional(),
  })
  .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
    message: "Tanggal selesai harus setelah tanggal mulai",
    path: ["end_date"],
  });

export const joinTripSchema = z.object({
  invite_code: z.string().min(4, "Kode undangan wajib diisi").max(16),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
