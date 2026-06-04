import { motion } from "framer-motion";

export type WizardStep = {
  id: string;
  label: string;
};

export function CreateTripStepIndicator({
  steps,
  currentIndex,
}: {
  steps: WizardStep[];
  currentIndex: number;
}) {
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">
          Step {currentIndex + 1} of {steps.length}
        </p>
        <p className="text-sm font-semibold text-foreground">{steps[currentIndex]?.label}</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-soft">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
