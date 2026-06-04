export type DestinationType =
  | "mountain"
  | "beach"
  | "city"
  | "countryside"
  | "international"
  | "custom";

export type BudgetMode = "total" | "per_person";

export type CreateTripWizardData = {
  trip_type: string;
  name: string;
  destination: string;
  destination_type: DestinationType;
  start_date: string;
  end_date: string;
  manual_members: string[];
  currency: string;
  budget_mode: BudgetMode;
  budget_amount: number;
  description: string;
};

export const defaultWizardData: CreateTripWizardData = {
  trip_type: "group",
  name: "",
  destination: "",
  destination_type: "mountain",
  start_date: "",
  end_date: "",
  manual_members: [],
  currency: "IDR",
  budget_mode: "total",
  budget_amount: 0,
  description: "",
};

export function isGroupLikeTrip(tripType: string) {
  return ["group", "open_trip", "hiking"].includes(tripType);
}

export function getMemberCount(data: CreateTripWizardData) {
  if (!isGroupLikeTrip(data.trip_type)) return 1;
  return Math.max(1, 1 + data.manual_members.length);
}

export function getTotalBudget(data: CreateTripWizardData) {
  const amount = Number(data.budget_amount) || 0;
  return data.budget_mode === "per_person" ? amount * getMemberCount(data) : amount;
}

export function getPerPersonBudget(data: CreateTripWizardData) {
  const members = getMemberCount(data);
  if (members <= 0) return 0;
  const amount = Number(data.budget_amount) || 0;
  return data.budget_mode === "per_person" ? amount : amount / members;
}
