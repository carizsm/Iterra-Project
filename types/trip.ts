import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Trip = Database["public"]["Tables"]["trips"]["Row"];
export type TripMember = Database["public"]["Tables"]["trip_members"]["Row"] & {
  profiles?: Pick<Profile, "id" | "full_name" | "avatar_url"> | null;
};
export type ItineraryItem = Database["public"]["Tables"]["itinerary_items"]["Row"];
export type BudgetItem = Database["public"]["Tables"]["budget_items"]["Row"];
export type Expense = Database["public"]["Tables"]["expenses"]["Row"];
export type ExpenseSplit = Database["public"]["Tables"]["expense_splits"]["Row"];
export type TripReview = Database["public"]["Tables"]["trip_reviews"]["Row"];

export type TripWorkspaceData = {
  trip: Trip;
  members: TripMember[];
  itinerary: ItineraryItem[];
  budgetItems: BudgetItem[];
  expenses: Expense[];
  expenseSplits: ExpenseSplit[];
  review: TripReview | null;
};
