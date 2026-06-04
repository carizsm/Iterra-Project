"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/form-field";
import { joinTripAction, type ActionState } from "./actions";

export function JoinTripForm() {
  const [state, action, pending] = useActionState(joinTripAction, {} as ActionState);
  return (
    <form action={action} className="space-y-4">
      <FormField label="Invite Code">
        <Input name="invite_code" placeholder="RINJANI26" className="uppercase" />
      </FormField>
      {state.error ? <p className="text-sm font-medium text-red-700">{state.error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Joining..." : "Join Trip"}
      </Button>
    </form>
  );
}
