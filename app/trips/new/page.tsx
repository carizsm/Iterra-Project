import { AppShell } from "@/components/layout/app-shell";
import { CreateTripWizard } from "@/features/trips/create/CreateTripWizard";
import { requireUser } from "@/features/trips/data";

export default async function NewTripPage() {
  await requireUser();
  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1080px] items-start overflow-hidden">
        <CreateTripWizard />
      </div>
    </AppShell>
  );
}
