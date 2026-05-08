import { redirect } from "next/navigation";
import { demoTrips, demoWorkspace } from "@/lib/demo-data";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import type { Trip, TripWorkspaceData } from "@/types/trip";

export async function requireUser() {
  const user = await getCurrentUser();
  if (!hasSupabaseEnv()) return { id: "demo-user", email: "demo@iterra.local" };
  if (!user) redirect("/login");
  return user;
}

export async function getTripsForCurrentUser(): Promise<Trip[]> {
  if (!hasSupabaseEnv()) return demoTrips;
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  void user;
  return data ?? [];
}

export async function getTripWorkspace(tripId: string): Promise<TripWorkspaceData> {
  if (!hasSupabaseEnv() || tripId === "demo-trip") return demoWorkspace;
  await requireUser();
  const supabase = await createClient();

  const [
    tripResult,
    membersResult,
    itineraryResult,
    budgetResult,
    expensesResult,
    splitsResult,
    reviewResult,
  ] = await Promise.all([
    supabase.from("trips").select("*").eq("id", tripId).single(),
    supabase
      .from("trip_members")
      .select("*, profiles(id, full_name, avatar_url)")
      .eq("trip_id", tripId)
      .order("joined_at", { ascending: true }),
    supabase
      .from("itinerary_items")
      .select("*")
      .eq("trip_id", tripId)
      .order("item_date", { ascending: true })
      .order("start_time", { ascending: true }),
    supabase.from("budget_items").select("*").eq("trip_id", tripId).order("created_at"),
    supabase.from("expenses").select("*").eq("trip_id", tripId).order("expense_date"),
    supabase.from("expense_splits").select("*"),
    supabase.from("trip_reviews").select("*").eq("trip_id", tripId).maybeSingle(),
  ]);

  if (tripResult.error) throw new Error(tripResult.error.message);
  return {
    trip: tripResult.data,
    members: membersResult.data ?? [],
    itinerary: itineraryResult.data ?? [],
    budgetItems: budgetResult.data ?? [],
    expenses: expensesResult.data ?? [],
    expenseSplits: splitsResult.data ?? [],
    review: reviewResult.data ?? null,
  };
}
