import React from "react";
import { Outlet } from "react-router";

import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { useLoadCurrentUser } from "~/hooks/api/useLoadCurrentUser";

const Dashboard = () => {
  const { currentUser, isFetching } = useLoadCurrentUser();

  return (
    <SidebarProvider className="mx-auto max-w-[1600px]">
      <AppSidebar currentUser={currentUser} />
      <Outlet />
    </SidebarProvider>
  );
};

export default Dashboard;
