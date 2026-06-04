import { redirect } from "next/navigation";
import { demoTrips, demoWorkspace } from "@/lib/demo-data";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import type { Trip, TripWorkspaceData } from "@/types/trip";

export type DashboardTrip = {
  trip: Trip;
  plannedBudget: number;
  actualExpenses: number;
  memberCount: number;
};

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

export async function getDashboardSummary() {
  if (!hasSupabaseEnv()) {
    const actualExpenses = demoWorkspace.expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );
    const plannedBudget = demoWorkspace.budgetItems.reduce(
      (sum, item) => sum + Number(item.estimated_amount),
      0,
    );
    return {
      trips: demoTrips,
      tripCards: [
        {
          trip: demoWorkspace.trip,
          plannedBudget,
          actualExpenses,
          memberCount: demoWorkspace.members.length,
        },
      ] satisfies DashboardTrip[],
      actualExpenses,
    };
  }

  const trips = await getTripsForCurrentUser();
  const supabase = await createClient();
  const tripIds = trips.map((trip) => trip.id);
  if (tripIds.length === 0) {
    return { trips, tripCards: [] satisfies DashboardTrip[], actualExpenses: 0 };
  }
  const [expensesResult, budgetResult, membersResult] = await Promise.all([
    supabase.from("expenses").select("trip_id, amount").in("trip_id", tripIds),
    supabase.from("budget_items").select("trip_id, estimated_amount").in("trip_id", tripIds),
    supabase.from("trip_members").select("trip_id").in("trip_id", tripIds),
  ]);

  if (expensesResult.error) throw new Error(expensesResult.error.message);
  if (budgetResult.error) throw new Error(budgetResult.error.message);
  if (membersResult.error) throw new Error(membersResult.error.message);

  const tripCards = trips.map((trip) => ({
    trip,
    plannedBudget: (budgetResult.data ?? [])
      .filter((item) => item.trip_id === trip.id)
      .reduce((sum, item) => sum + Number(item.estimated_amount), 0),
    actualExpenses: (expensesResult.data ?? [])
      .filter((expense) => expense.trip_id === trip.id)
      .reduce((sum, expense) => sum + Number(expense.amount), 0),
    memberCount: (membersResult.data ?? []).filter((member) => member.trip_id === trip.id).length,
  }));

  return {
    trips,
    tripCards,
    actualExpenses: (expensesResult.data ?? []).reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    ),
  };
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
