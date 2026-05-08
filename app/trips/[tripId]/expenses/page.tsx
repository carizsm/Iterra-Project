import { CircleDollarSign } from "lucide-react";
import { WorkspaceShell } from "@/features/trips/workspace-shell";
import { ExpenseForm } from "@/features/expenses/expense-form";
import { TripCharts } from "@/features/analytics/trip-charts";
import { StatCard } from "@/components/common/stat-card";
import { ExpenseCategoryBadge } from "@/components/common/expense-category-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatters";
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
    <WorkspaceShell trip={data.trip} active="expenses">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Actual" value={formatCurrency(actual, data.trip.currency)} icon={CircleDollarSign} />
        <StatCard label="Planned Budget" value={formatCurrency(estimated, data.trip.currency)} icon={CircleDollarSign} />
        <StatCard label="Selisih" value={formatCurrency(estimated - actual, data.trip.currency)} icon={CircleDollarSign} />
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Patungan</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            {balances.map((balance) => (
              <div key={balance.memberId} className="flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="font-medium">{balance.name}</p>
                  <p className="text-sm text-muted">
                    Bayar {formatCurrency(balance.paid, data.trip.currency)} · Share {formatCurrency(balance.owedShare, data.trip.currency)}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(balance.net, data.trip.currency)}</p>
              </div>
            ))}
          </div>
          <div className="rounded-md bg-soft p-4">
            <p className="mb-3 font-medium">Settlement suggestions</p>
            {settlements.length > 0 ? (
              <div className="space-y-2">
                {settlements.map((settlement) => (
                  <p key={`${settlement.fromMemberId}-${settlement.toMemberId}`} className="text-sm text-muted">
                    {settlement.fromName} perlu membayar {settlement.toName} sebesar{" "}
                    <span className="font-semibold text-foreground">
                      {formatCurrency(settlement.amount, data.trip.currency)}
                    </span>
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">Belum ada selisih patungan yang perlu diselesaikan.</p>
            )}
          </div>
        </CardContent>
      </Card>
      <TripCharts
        currency={data.trip.currency}
        planned={estimated}
        actual={actual}
        categoryData={categoryData}
        memberData={memberData}
      />
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.expenses.map((expense) => {
              const payer = data.members.find((member) => member.user_id === expense.paid_by);
              return (
                <div key={expense.id} className="rounded-md border border-border p-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{expense.name}</p>
                      <p className="text-sm text-muted">
                        {formatDate(expense.expense_date)} · Dibayar {payer?.profiles?.full_name ?? "Member"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{formatCurrency(expense.amount, data.trip.currency)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <ExpenseCategoryBadge category={expense.category} />
                    <span className="text-xs text-muted">{expense.split_method === "equal" ? "Bagi rata" : "Custom"}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm tripId={tripId} members={data.members} />
          </CardContent>
        </Card>
      </section>
    </WorkspaceShell>
  );
}
