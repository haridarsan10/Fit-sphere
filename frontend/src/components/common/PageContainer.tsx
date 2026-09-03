import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children, }: PageContainerProps) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      {children}
    </main>
  );
}