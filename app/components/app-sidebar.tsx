import { Home, Inbox, Search, Settings } from "lucide-react";
import { type UserOut } from "~/types/api";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "~/components/ui/sidebar";

import { NavUser } from "~/components/nav-user";

const items = [
  {
    title: "Users",
    url: "/admin/users",
    icon: Home,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Inbox,
  },
  {
    title: "Levels",
    url: "/admin/levels",
    icon: Inbox,
  },
  {
    title: "Meanings",
    url: "/admin/meanings",
    icon: Inbox,
  },
  {
    title: "Definitions",
    url: "/admin/definitions",
    icon: Inbox,
  },
];

type Props = {
  currentUser?: UserOut;
};

export function AppSidebar({ currentUser }: Props) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
