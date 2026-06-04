"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionPanel } from "@/components/common/section-panel";
import { formatCurrency } from "@/lib/formatters";

const colors = ["#315846", "#C86B4A", "#7C8C72", "#D6A56D", "#53606A", "#9E7B61"];

export function TripCharts({
  currency,
  planned,
  actual,
  categoryData,
  memberData,
}: {
  currency: string;
  planned: number;
  actual: number;
  categoryData: { name: string; value: number }[];
  memberData: { name: string; paid: number; share: number }[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <SectionPanel title="Planned vs Actual">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{ name: "Budget", planned, actual }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5DED3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${Number(value) / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
              <Bar dataKey="planned" fill="#315846" name="Planned" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#C86B4A" name="Actual" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionPanel>
      <SectionPanel title="By Category">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={82}>
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionPanel>
      <SectionPanel title="By Member">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={memberData} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5DED3" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={72} />
              <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
              <Bar dataKey="paid" fill="#315846" name="Paid" radius={[0, 4, 4, 0]} />
              <Bar dataKey="share" fill="#C86B4A" name="Share" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionPanel>
    </div>
  );
}
