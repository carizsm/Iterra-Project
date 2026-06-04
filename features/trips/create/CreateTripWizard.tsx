"use client";

import { useActionState, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyInput } from "@/components/common/currency-input";
import { FormField } from "@/components/common/form-field";
import { BudgetProgress } from "@/components/common/budget-progress";
import { formatCurrency, formatDateRange } from "@/lib/formatters";
import { calculateTripDuration } from "@/lib/calculations/budget";
import { createTripAction, type ActionState } from "@/features/trips/actions";
import { TripTypeSelector } from "@/features/trips/trip-type-selector";
import {
  BudgetIllustration,
  DestinationIllustration,
  MembersIllustration,
  TripTypeIllustration,
} from "./components/illustrations";
import { CreateTripStepIndicator, type WizardStep } from "./components/CreateTripStepIndicator";
import { DestinationSelector } from "./components/DestinationSelector";
import { DateRangePicker } from "./components/DateRangePicker";
import { ManualMemberInput } from "./components/ManualMemberInput";
import {
  defaultWizardData,
  getMemberCount,
  getPerPersonBudget,
  getTotalBudget,
  isGroupLikeTrip,
  type BudgetMode,
  type CreateTripWizardData,
  type DestinationType,
} from "./types";
import { cn } from "@/lib/utils";

const baseSteps: WizardStep[] = [
  { id: "type", label: "Trip Type" },
  { id: "destination", label: "Destination" },
  { id: "dates", label: "Travel Dates" },
  { id: "members", label: "Members" },
  { id: "budget", label: "Budget" },
  { id: "review", label: "Review" },
];

function shouldShowMembers(data: CreateTripWizardData) {
  return isGroupLikeTrip(data.trip_type);
}

function getSteps(data: CreateTripWizardData) {
  return shouldShowMembers(data) ? baseSteps : baseSteps.filter((step) => step.id !== "members");
}

function getStepError(step: string, data: CreateTripWizardData) {
  if (step === "type" && !data.trip_type) return "Choose a trip type.";
  if (step === "destination") {
    if (!data.name.trim()) return "Trip name is required.";
    if (!data.destination.trim()) return "Destination is required.";
  }
  if (step === "dates") {
    if (!data.start_date) return "Start date is required.";
    if (!data.end_date) return "End date is required.";
    if (new Date(data.end_date) < new Date(data.start_date)) {
      return "End date must be after the start date.";
    }
  }
  if (step === "budget" && Number(data.budget_amount) < 0) return "Budget cannot be negative.";
  return "";
}

export function CreateTripWizard() {
  const [serverState, formAction, pending] = useActionState(createTripAction, {} as ActionState);
  const [data, setData] = useState<CreateTripWizardData>(defaultWizardData);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const steps = useMemo(() => getSteps(data), [data]);
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex] ?? steps[0];
  const currentError = getStepError(currentStep.id, data);
  const memberCount = getMemberCount(data);
  const totalBudget = getTotalBudget(data);
  const perPersonBudget = getPerPersonBudget(data);

  function update(patch: Partial<CreateTripWizardData>) {
    setData((current) => ({ ...current, ...patch }));
  }

  function next() {
    if (currentError) return;
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  }

  function back() {
    setStepIndex((index) => Math.max(index - 1, 0));
  }

  return (
    <form action={formAction} className="mx-auto flex w-full max-w-[1080px] flex-col">
      <input type="hidden" name="trip_type" value={data.trip_type} />
      <input type="hidden" name="name" value={data.name} />
      <input type="hidden" name="destination" value={data.destination} />
      <input type="hidden" name="start_date" value={data.start_date} />
      <input type="hidden" name="end_date" value={data.end_date} />
      <input type="hidden" name="target_budget" value={totalBudget} />
      <input type="hidden" name="currency" value={data.currency} />
      <input type="hidden" name="description" value={data.description} />
      {/* Manual members are planning-only until the database supports external trip participants. */}

      <motion.div
        layout
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col rounded-[1.5rem] bg-paper/85 p-3.5 shadow-[0_24px_70px_rgba(49,88,70,0.08)] sm:p-4"
      >
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Create New Trip</p>
            <p className="text-sm text-muted">Set up the essentials for a focused travel workspace.</p>
          </div>
        </div>
        <CreateTripStepIndicator steps={steps} currentIndex={stepIndex} />

        <div className="mt-2.5 rounded-[1.25rem] bg-surface p-3.5 shadow-[inset_0_0_0_1px_#E5DED3] sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentStep.id === "type" ? (
                <div className="grid items-center gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
                  <TripTypeIllustration type={data.trip_type} />
                  <div className="space-y-3.5">
                    <div>
                      <h2 className="text-xl font-semibold sm:text-2xl">What kind of trip is this?</h2>
                      <p className="mt-2 text-sm text-muted">
                        Choose the setup that best matches how you will plan and split costs.
                      </p>
                    </div>
                    <TripTypeSelector
                      value={data.trip_type}
                      onChange={(value) => {
                        update({ trip_type: value });
                        if (!shouldShowMembers({ ...data, trip_type: value })) {
                          update({ manual_members: [] });
                        }
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {currentStep.id === "destination" ? (
                <div className="space-y-3.5">
                  <div className="grid items-center gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
                    <DestinationIllustration type={data.destination_type} />
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-xl font-semibold sm:text-2xl">Name the journey.</h2>
                        <p className="mt-2 text-sm text-muted">
                          Add a clear trip name and destination so the workspace feels grounded.
                        </p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Trip Name">
                          <Input
                            value={data.name}
                            onChange={(event) => update({ name: event.target.value })}
                            placeholder="Rinjani Long Weekend"
                          />
                        </FormField>
                        <FormField label="Destination">
                          <Input
                            value={data.destination}
                            onChange={(event) => update({ destination: event.target.value })}
                            placeholder="Lombok, Indonesia"
                          />
                        </FormField>
                      </div>
                    </div>
                  </div>
                  <DestinationSelector
                    value={data.destination_type}
                    onChange={(value: DestinationType) => update({ destination_type: value })}
                  />
                </div>
              ) : null}

              {currentStep.id === "dates" ? (
                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-semibold sm:text-2xl">Set the travel dates.</h2>
                    <p className="mt-2 text-sm text-muted">
                      Pick a range for itinerary grouping and trip duration.
                    </p>
                  </div>
                  <DateRangePicker
                    startDate={data.start_date}
                    endDate={data.end_date}
                    onStartChange={(value) => update({ start_date: value })}
                    onEndChange={(value) => update({ end_date: value })}
                  />
                  {data.start_date && data.end_date ? (
                    <div className="rounded-xl bg-soft px-3 py-2.5 text-sm">
                      <span className="font-medium">{formatDateRange(data.start_date, data.end_date)}</span>
                      <span className="ml-2 text-muted">
                        {calculateTripDuration(data.start_date, data.end_date)} days,{" "}
                        {Math.max(0, calculateTripDuration(data.start_date, data.end_date) - 1)} nights
                      </span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {currentStep.id === "members" ? (
                <div className="grid items-center gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
                  <MembersIllustration />
                  <div className="space-y-3.5">
                    <div>
                      <h2 className="text-xl font-semibold sm:text-2xl">Plan with your group.</h2>
                      <p className="mt-2 text-sm text-muted">
                        Invite friends later or add names manually for early budget planning.
                      </p>
                    </div>
                    <div className="rounded-xl bg-soft p-3 text-sm text-muted">
                      <div className="flex items-center gap-2 font-medium text-foreground">
                        <Copy className="h-4 w-4 text-primary" />
                        Invite code will be available after the trip is created.
                      </div>
                    </div>
                    <ManualMemberInput
                      members={data.manual_members}
                      onChange={(members) => update({ manual_members: members })}
                    />
                    <div className="flex items-center gap-2 rounded-full bg-surface text-sm text-muted">
                      <Users className="h-4 w-4 text-primary" />
                      {memberCount} member{memberCount > 1 ? "s" : ""} for budget planning
                    </div>
                  </div>
                </div>
              ) : null}

              {currentStep.id === "budget" ? (
                <div className="grid items-center gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
                  <BudgetIllustration group={isGroupLikeTrip(data.trip_type)} />
                  <div className="space-y-3.5">
                    <div>
                      <h2 className="text-xl font-semibold sm:text-2xl">Set the first budget.</h2>
                      <p className="mt-2 text-sm text-muted">
                        You can refine categories and actual expenses later in the workspace.
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
                      <FormField label="Budget Amount">
                        <CurrencyInput
                          value={data.budget_amount}
                          onChange={(event) => update({ budget_amount: Number(event.target.value) })}
                        />
                      </FormField>
                      <FormField label="Currency">
                        <Input
                          value={data.currency}
                          onChange={(event) => update({ currency: event.target.value })}
                        />
                      </FormField>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        { value: "total", label: "Total trip budget" },
                        { value: "per_person", label: "Per person budget" },
                      ].map((mode) => (
                        <button
                          key={mode.value}
                          type="button"
                          onClick={() => update({ budget_mode: mode.value as BudgetMode })}
                          className={cn(
                            "min-h-11 rounded-xl border border-border px-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-soft",
                            data.budget_mode === mode.value && "border-primary bg-primary text-white",
                          )}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-2xl bg-soft p-3">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted">Members</p>
                          <p className="mt-1 font-semibold">{memberCount}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted">Per person</p>
                          <p className="mt-1 font-semibold">
                            {formatCurrency(perPersonBudget, data.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted">Total</p>
                          <p className="mt-1 font-semibold">
                            {formatCurrency(totalBudget, data.currency)}
                          </p>
                        </div>
                      </div>
                      <BudgetProgress value={Math.min(100, totalBudget ? 68 : 18)} className="mt-3" />
                    </div>
                  </div>
                </div>
              ) : null}

              {currentStep.id === "review" ? (
                <div className="grid items-center gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
                  <DestinationIllustration type={data.destination_type} size="md" />
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-xl font-semibold">Review and create.</h2>
                      <p className="mt-2 text-sm text-muted">You can edit these details later.</p>
                    </div>
                    <div className="rounded-2xl bg-soft p-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-semibold">{data.name || "Untitled trip"}</h3>
                          <p className="mt-0.5 text-sm text-muted">{data.destination || "No destination"}</p>
                        </div>
                        <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-primary">
                          {data.trip_type.replace("_", " ")}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-1.5 text-xs sm:grid-cols-2">
                        <p><span className="text-muted">Destination:</span> {data.destination_type}</p>
                        <p><span className="text-muted">Dates:</span> {data.start_date && data.end_date ? formatDateRange(data.start_date, data.end_date) : "-"}</p>
                        <p><span className="text-muted">Members:</span> {memberCount}</p>
                        <p><span className="text-muted">Mode:</span> {data.budget_mode === "total" ? "Total" : "Per person"}</p>
                        <p className="sm:col-span-2"><span className="text-muted">Target:</span> {formatCurrency(totalBudget, data.currency)}</p>
                      </div>
                    </div>
                    <FormField label="Short Note">
                      <Textarea
                        value={data.description}
                        onChange={(event) => update({ description: event.target.value })}
                        placeholder="Add a short note for your travel group."
                        rows={2}
                        className="min-h-14"
                      />
                    </FormField>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {currentError ? <p className="mt-2 text-sm font-medium text-red-700">{currentError}</p> : null}
        {serverState.error ? <p className="mt-2 text-sm font-medium text-red-700">{serverState.error}</p> : null}

        <div className="mt-3 flex shrink-0 flex-col-reverse gap-2.5 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="outline" onClick={back} disabled={stepIndex === 0}>
            Back
          </Button>
          {currentStep.id === "review" ? (
            <Button
              type="button"
              disabled={pending || Boolean(currentError)}
              onClick={() => setConfirmOpen(true)}
            >
              Create Trip
            </Button>
          ) : (
            <Button type="button" onClick={next} disabled={Boolean(currentError)}>
              Next
            </Button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {confirmOpen ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#1F2933]/35 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl rounded-[1.5rem] bg-surface p-5 shadow-[0_30px_90px_rgba(31,41,51,0.22)] sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-create-trip-title"
            >
              <div className="space-y-5">
                <div>
                  <h2 id="confirm-create-trip-title" className="text-2xl font-semibold">
                    Create this trip?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Review your setup before creating the workspace. You can still edit the
                    details later.
                  </p>
                </div>

                <div className="rounded-2xl bg-soft p-4">
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <p><span className="text-muted">Trip:</span> {data.name || "Untitled trip"}</p>
                    <p><span className="text-muted">Destination:</span> {data.destination || "-"}</p>
                    <p><span className="text-muted">Type:</span> {data.trip_type.replace("_", " ")}</p>
                    <p><span className="text-muted">Dates:</span> {data.start_date && data.end_date ? formatDateRange(data.start_date, data.end_date) : "-"}</p>
                    <p><span className="text-muted">Duration:</span> {data.start_date && data.end_date ? `${calculateTripDuration(data.start_date, data.end_date)} days, ${Math.max(0, calculateTripDuration(data.start_date, data.end_date) - 1)} nights` : "-"}</p>
                    <p><span className="text-muted">Members:</span> {memberCount}</p>
                    <p><span className="text-muted">Budget mode:</span> {data.budget_mode === "total" ? "Total" : "Per person"}</p>
                    <p><span className="text-muted">Target:</span> {formatCurrency(totalBudget, data.currency)}</p>
                    {memberCount > 1 ? (
                      <p><span className="text-muted">Per person:</span> {formatCurrency(perPersonBudget, data.currency)}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
                    Back to Edit
                  </Button>
                  <Button type="submit" disabled={pending}>
                    {pending ? "Creating..." : "Confirm & Create"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
