export type SplitMember = {
  id: string;
  name: string;
};

export type SplitExpense = {
  id: string;
  amount: number;
  paid_by: string;
  split_method?: "equal" | "custom" | string | null;
};

export type SplitRecord = {
  expense_id: string;
  user_id: string;
  share_amount: number;
};

export type MemberBalance = {
  memberId: string;
  name: string;
  paid: number;
  owedShare: number;
  net: number;
};

export type SettlementSuggestion = {
  fromMemberId: string;
  fromName: string;
  toMemberId: string;
  toName: string;
  amount: number;
};

export function calculateSplitBalances(
  members: SplitMember[],
  expenses: SplitExpense[],
  splits: SplitRecord[] = [],
) {
  const balances = new Map<string, MemberBalance>();

  members.forEach((member) => {
    balances.set(member.id, {
      memberId: member.id,
      name: member.name,
      paid: 0,
      owedShare: 0,
      net: 0,
    });
  });

  expenses.forEach((expense) => {
    const paidBy = balances.get(expense.paid_by);
    if (paidBy) paidBy.paid += Number(expense.amount) || 0;

    const customSplits = splits.filter((split) => split.expense_id === expense.id);
    if (customSplits.length > 0) {
      customSplits.forEach((split) => {
        const balance = balances.get(split.user_id);
        if (balance) balance.owedShare += Number(split.share_amount) || 0;
      });
      return;
    }

    const activeMembers = members.length || 1;
    const equalShare = (Number(expense.amount) || 0) / activeMembers;
    members.forEach((member) => {
      const balance = balances.get(member.id);
      if (balance) balance.owedShare += equalShare;
    });
  });

  return Array.from(balances.values()).map((balance) => ({
    ...balance,
    net: balance.paid - balance.owedShare,
  }));
}

export function generateSettlementSuggestions(balances: MemberBalance[]) {
  const debtors = balances
    .filter((balance) => balance.net < -0.5)
    .map((balance) => ({ ...balance, remaining: Math.abs(balance.net) }))
    .sort((a, b) => b.remaining - a.remaining);
  const creditors = balances
    .filter((balance) => balance.net > 0.5)
    .map((balance) => ({ ...balance, remaining: balance.net }))
    .sort((a, b) => b.remaining - a.remaining);
  const settlements: SettlementSuggestion[] = [];

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];
    const amount = Math.min(debtor.remaining, creditor.remaining);

    if (amount > 0.5) {
      settlements.push({
        fromMemberId: debtor.memberId,
        fromName: debtor.name,
        toMemberId: creditor.memberId,
        toName: creditor.name,
        amount,
      });
    }

    debtor.remaining -= amount;
    creditor.remaining -= amount;

    if (debtor.remaining <= 0.5) debtorIndex += 1;
    if (creditor.remaining <= 0.5) creditorIndex += 1;
  }

  return settlements;
}
