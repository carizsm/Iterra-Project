"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { createTripSchema, joinTripSchema } from "@/lib/validations/trips";
import { budgetItemSchema } from "@/lib/validations/budget";
import { expenseSchema } from "@/lib/validations/expenses";
import { itineraryItemSchema } from "@/lib/validations/itinerary";
import { tripReviewSchema } from "@/lib/validations/reviews";
import { requireUser } from "./data";

export type ActionState = { error?: string; success?: string };

function generateInviteCode(name: string) {
  const slug = name.replace(/[^a-z0-9]/gi, "").slice(0, 5).toUpperCase() || "TRIP";
  return `${slug}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function createTripAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createTripSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (!hasSupabaseEnv()) redirect("/trips/demo-trip/overview");

  const user = await requireUser();
  const supabase = await createClient();
  const fullName =
    "user_metadata" in user ? user.user_metadata?.full_name ?? user.email : user.email;
  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName ?? "Traveler",
  });

  const { data: trip, error } = await supabase
    .from("trips")
    .insert({
      ...parsed.data,
      owner_id: user.id,
      invite_code: generateInviteCode(parsed.data.name),
    })
    .select()
    .single();

  if (error || !trip) return { error: error?.message ?? "Trip gagal dibuat" };

  const memberResult = await supabase
    .from("trip_members")
    .insert({ trip_id: trip.id, user_id: user.id, role: "owner" });
  if (memberResult.error) return { error: memberResult.error.message };
  redirect(`/trips/${trip.id}/overview`);
}

export async function joinTripAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = joinTripSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (!hasSupabaseEnv()) redirect("/trips/demo-trip/overview");

  const user = await requireUser();
  const supabase = await createClient();
  const { data: trip, error } = await supabase
    .from("trips")
    .select("id")
    .eq("invite_code", parsed.data.invite_code.toUpperCase())
    .single();
  if (error || !trip) return { error: "Kode undangan tidak ditemukan" };

  const memberResult = await supabase
    .from("trip_members")
    .upsert({ trip_id: trip.id, user_id: user.id, role: "member" });
  if (memberResult.error) return { error: memberResult.error.message };
  redirect(`/trips/${trip.id}/overview`);
}

export async function addItineraryAction(tripId: string, _: ActionState, formData: FormData) {
  const parsed = itineraryItemSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (!hasSupabaseEnv()) return { success: "Mode demo: item itinerary tervalidasi." };

  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("itinerary_items")
    .insert({ ...parsed.data, trip_id: tripId, created_by: user.id });
  if (error) return { error: error.message };
  revalidatePath(`/trips/${tripId}/itinerary`);
  return { success: "Itinerary ditambahkan." };
}

export async function addBudgetItemAction(tripId: string, _: ActionState, formData: FormData) {
  const parsed = budgetItemSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (!hasSupabaseEnv()) return { success: "Mode demo: budget tervalidasi." };

  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("budget_items")
    .insert({ ...parsed.data, trip_id: tripId, created_by: user.id });
  if (error) return { error: error.message };
  revalidatePath(`/trips/${tripId}/budget`);
  return { success: "Budget ditambahkan." };
}

export async function addExpenseAction(tripId: string, _: ActionState, formData: FormData) {
  const parsed = expenseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (!hasSupabaseEnv()) return { success: "Mode demo: pengeluaran tervalidasi." };

  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .insert({ ...parsed.data, trip_id: tripId, created_by: user.id });
  if (error) return { error: error.message };
  revalidatePath(`/trips/${tripId}/expenses`);
  return { success: "Pengeluaran ditambahkan." };
}

export async function saveReviewAction(tripId: string, _: ActionState, formData: FormData) {
  const parsed = tripReviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (!hasSupabaseEnv()) return { success: "Mode demo: review tervalidasi." };

  const user = await requireUser();
  const supabase = await createClient();
  const { error } = await supabase
    .from("trip_reviews")
    .upsert({ ...parsed.data, trip_id: tripId, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath(`/trips/${tripId}/review`);
  return { success: "Review disimpan." };
}
