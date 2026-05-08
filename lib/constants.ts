import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Home,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";

export const APP_NAME = "Iterra";
export const TAGLINE = "Plan, split, and remember every journey.";
export const TAGLINE_ID = "Rencanakan, bagi biaya, dan catat setiap perjalanan.";

export const tripTypes = [
  { value: "solo", label: "Solo" },
  { value: "group", label: "Group" },
  { value: "hiking", label: "Hiking" },
  { value: "open_trip", label: "Open Trip" },
  { value: "city_trip", label: "City Trip" },
  { value: "international", label: "International" },
] as const;

export const itineraryStatuses = [
  { value: "planned", label: "Direncanakan" },
  { value: "done", label: "Selesai" },
  { value: "skipped", label: "Dilewati" },
] as const;

export const budgetCategories = [
  "Transportasi",
  "Akomodasi",
  "Makan",
  "Tiket & Retribusi",
  "Sewa Alat",
  "Emergency Fund",
  "Oleh-oleh",
  "Lain-lain",
] as const;

export const appNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/trips", label: "Trips", icon: CalendarDays },
  { href: "/trips/new", label: "Create Trip", icon: PlusCircle },
  { href: "/profile", label: "Settings", icon: Settings },
] as const;

export const workspaceNavItems = [
  { segment: "overview", label: "Overview", icon: BarChart3 },
  { segment: "itinerary", label: "Itinerary", icon: CalendarDays },
  { segment: "budget", label: "Budget", icon: CircleDollarSign },
  { segment: "expenses", label: "Expenses", icon: CircleDollarSign },
  { segment: "members", label: "Members", icon: Users },
  { segment: "review", label: "Review", icon: Settings },
] as const;
