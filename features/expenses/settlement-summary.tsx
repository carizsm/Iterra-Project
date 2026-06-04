"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CopyButton } from "@/components/common/copy-button";
import { ListRow } from "@/components/common/list-row";
import { formatCurrency } from "@/lib/formatters";
import type { MemberBalance, SettlementSuggestion } from "@/lib/calculations/split";

export function SettlementSummary({
  balances,
  settlements,
  currency,
}: {
  balances: MemberBalance[];
  settlements: SettlementSuggestion[];
  currency: string;
}) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const topPayer = [...balances].sort((a, b) => b.paid - a.paid)[0];
  const settlementText =
    settlements.length > 0
      ? settlements
          .map((item) => `${item.fromName} pays ${item.toName} ${formatCurrency(item.amount, currency)}`)
          .join("; ")
      : "Shared costs are balanced.";

  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="space-y-3.5">
        {topPayer ? (
          <div className="rounded-xl bg-soft/65 p-4 shadow-[inset_0_0_0_1px_rgba(229,222,211,0.9)]">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Top payer</p>
            <p className="mt-1 font-semibold">
              {topPayer.name} - {formatCurrency(topPayer.paid, currency)}
            </p>
          </div>
        ) : null}
        {balances.map((balance) => {
          const isExpanded = expandedMember === balance.memberId;
          const tone = balance.net > 0 ? "text-primary" : balance.net < 0 ? "text-accent" : "text-muted";
          return (
            <motion.div key={balance.memberId} layout>
              <button
                type="button"
                onClick={() => setExpandedMember(isExpanded ? null : balance.memberId)}
                className="w-full text-left"
              >
                <ListRow
                  title={balance.name}
                  description={balance.net > 0 ? "Gets paid" : balance.net < 0 ? "Needs to pay" : "Settled"}
                  aside={<span className={tone}>{formatCurrency(balance.net, currency)}</span>}
                />
              </button>
              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-2 -mt-1 rounded-b-md bg-soft/50 px-4 py-3 text-sm text-muted">
                      Paid {formatCurrency(balance.paid, currency)}. Share{" "}
                      {formatCurrency(balance.owedShare, currency)}.
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <div className="rounded-xl bg-soft p-5 shadow-[inset_0_0_0_1px_rgba(229,222,211,0.9)]">
        <p className="mb-4 font-medium">Who pays whom?</p>
        {settlements.length > 0 ? (
          <div className="space-y-3.5">
            {settlements.map((settlement) => (
              <div
                key={`${settlement.fromMemberId}-${settlement.toMemberId}`}
                className="rounded-xl bg-surface/90 p-3.5 text-sm shadow-[inset_0_0_0_1px_#E5DED3]"
              >
                <span className="font-medium">{settlement.fromName}</span> pays{" "}
                <span className="font-medium">{settlement.toName}</span>
                <span className="block text-muted">{formatCurrency(settlement.amount, currency)}</span>
              </div>
            ))}
            <CopyButton value={settlementText} label="Copy summary" />
          </div>
        ) : (
          <p className="text-sm text-muted">No shared-cost difference to settle yet.</p>
        )}
      </div>
    </div>
  );
}
