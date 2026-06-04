import { CalendarDays, Home, PlusCircle, Settings } from "lucide-react";

export const APP_NAME = "Iterra";
export const TAGLINE = "Plan, split, and remember every journey.";
export const TAGLINE_ID = "Plan your route, split costs, and keep every journey remembered.";

export const tripTypes = [
  { value: "solo", label: "Solo" },
  { value: "group", label: "Group" },
  { value: "hiking", label: "Hiking" },
  { value: "open_trip", label: "Open Trip" },
  { value: "city_trip", label: "City Trip" },
  { value: "international", label: "International" },
] as const;

export const itineraryStatuses = [
  { value: "planned", label: "Planned" },
  { value: "done", label: "Done" },
  { value: "skipped", label: "Skipped" },
] as const;

export const budgetCategories = [
  "Transport",
  "Accommodation",
  "Food",
  "Tickets & Fees",
  "Gear Rental",
  "Emergency Fund",
  "Souvenirs",
  "Other",
] as const;

export const appNavItems = [
  { href: "/dashboard", label: "Dashboard", mobileLabel: "Home", icon: Home },
  { href: "/trips", label: "Trips", mobileLabel: "Trips", icon: CalendarDays },
  { href: "/trips/new", label: "Create Trip", mobileLabel: "Create", icon: PlusCircle },
  { href: "/profile", label: "Settings", mobileLabel: "Profile", icon: Settings },
] as const;

export const workspaceNavItems = [
  { segment: "overview", label: "Overview" },
  { segment: "itinerary", label: "Itinerary" },
  { segment: "budget", label: "Budget" },
  { segment: "expenses", label: "Expenses" },
  { segment: "members", label: "Members" },
  { segment: "review", label: "Review" },
] as const;
