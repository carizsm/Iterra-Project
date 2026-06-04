"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ManualMemberInput({
  members,
  onChange,
}: {
  members: string[];
  onChange: (members: string[]) => void;
}) {
  const [name, setName] = useState("");
  const visibleMembers = members.slice(0, 4);
  const remainingCount = members.length - visibleMembers.length;

  return (
    <div className="space-y-2.5">
      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Member name"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const trimmed = name.trim();
            if (!trimmed) return;
            onChange([...members, trimmed]);
            setName("");
          }}
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {visibleMembers.map((member) => (
            <motion.span
              key={member}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-sm font-medium"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                {member.slice(0, 1).toUpperCase()}
              </span>
              {member}
              <button
                type="button"
                aria-label={`Remove ${member}`}
                onClick={() => onChange(members.filter((item) => item !== member))}
                className="rounded-full p-1 text-muted hover:bg-surface hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.span>
          ))}
          {remainingCount > 0 ? (
            <motion.span
              key="remaining-members"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="inline-flex items-center rounded-full bg-soft px-3 py-1.5 text-sm font-medium text-muted"
            >
              +{remainingCount} more
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
