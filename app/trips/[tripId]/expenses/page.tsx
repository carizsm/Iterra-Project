import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { ExpenseForm } from "@/features/expenses/expense-form";
import { TripCharts } from "@/features/analytics/trip-charts";
import { ActionDialog } from "@/components/common/action-dialog";
import { SectionPanel } from "@/components/common/section-panel";
import { SettlementSummary } from "@/features/expenses/settlement-summary";
import { ExpenseList } from "@/features/expenses/expense-list";
import { formatCurrency } from "@/lib/formatters";
import { groupExpensesByCategory } from "@/lib/calculations/grouping";
import { calculateSplitBalances, generateSettlementSuggestions } from "@/lib/calculations/split";
import { getTripWorkspace, requireUser } from "@/features/trips/data";

export default async function ExpensesPage({ params }: { params: Promise<{ tripId: string }> }) {
  await requireUser();
  const { tripId } = await params;
  const data = await getTripWorkspace(tripId);
  const estimated = data.budgetItems.reduce((sum, item) => sum + Number(item.estimated_amount), 0);
  const actual = data.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const members = data.members.map((member) => ({
    id: member.user_id,
    name: member.profiles?.full_name ?? "Member",
  }));
  const balances = calculateSplitBalances(
    members,
    data.expenses.map((expense) => ({
      id: expense.id,
      amount: Number(expense.amount),
      paid_by: expense.paid_by,
      split_method: expense.split_method,
    })),
    data.expenseSplits.map((split) => ({
      expense_id: split.expense_id,
      user_id: split.user_id,
      share_amount: Number(split.share_amount),
    })),
  );
  const settlements = generateSettlementSuggestions(balances);
  const categoryData = Object.entries(groupExpensesByCategory(data.expenses)).map(([name, value]) => ({
    name,
    value,
  }));
  const memberData = balances.map((balance) => ({
    name: balance.name,
    paid: balance.paid,
    share: balance.owedShare,
  }));

  return (
    <WorkspaceShell trip={data.trip} active="expenses" workspace={data}>
      <SectionPanel
        title="Expense Snapshot"
        description="Track actual spending without turning the trip into an accounting page."
        action={
          <ActionDialog
            title="Add Expense"
            description="Record who paid, the amount, and how it should be split."
            triggerLabel="Add Expense"
          >
            <ExpenseForm tripId={tripId} members={data.members} />
          </ActionDialog>
        }
      >
        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <p><span className="text-muted">Actual:</span> <span className="font-medium">{formatCurrency(actual, data.trip.currency)}</span></p>
          <p><span className="text-muted">Planned:</span> <span className="font-medium">{formatCurrency(estimated, data.trip.currency)}</span></p>
          <p><span className="text-muted">Difference:</span> <span className="font-medium">{formatCurrency(estimated - actual, data.trip.currency)}</span></p>
        </div>
      </SectionPanel>

      <SectionPanel
        title="Shared Cost Summary"
        description="Positive net means a member paid more than their share. Negative net means they still owe."
      >
        <SettlementSummary balances={balances} settlements={settlements} currency={data.trip.currency} />
      </SectionPanel>

      {data.expenses.length > 0 ? (
        <TripCharts
          currency={data.trip.currency}
          planned={estimated}
          actual={actual}
          categoryData={categoryData}
          memberData={memberData}
        />
      ) : null}

      <SectionPanel title="Expense List">
        <ExpenseList expenses={data.expenses} members={data.members} currency={data.trip.currency} />
      </SectionPanel>
    </WorkspaceShell>
  );
}
