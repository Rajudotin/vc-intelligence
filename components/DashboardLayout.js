"use client";

import { useSidebar } from "@/app/providers";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`
          flex-1 h-screen transition-all duration-300
          ml-0
          ${isCollapsed ? "lg:ml-0" : "lg:ml-5"}
        `}
      >
        <div className="max-w-7xl mx-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
