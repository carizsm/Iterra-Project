import { MotionPage } from "@/components/common/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return <MotionPage className="flex flex-1 flex-col">{children}</MotionPage>;
}
