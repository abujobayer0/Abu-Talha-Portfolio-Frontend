import React, { ReactNode } from "react";

import SidebarMain from "../_components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return <SidebarMain>{children}</SidebarMain>;
}
