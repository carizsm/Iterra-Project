import { Badge } from "@/components/ui/badge";

export function ExpenseCategoryBadge({ category }: { category: string }) {
  return <Badge variant="accent">{category}</Badge>;
}
