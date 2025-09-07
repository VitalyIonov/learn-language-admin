import { Home, Inbox } from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
    icon: Inbox,
    subItems: [
      {
        title: "Text definitions",
        url: "/admin/definitions/text",
        icon: Inbox,
      },
      {
        title: "Image definitions",
        url: "/admin/definitions/image",
        icon: Inbox,
      },
    ],
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
                    {item.url ? (
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <p>
                        <item.icon />
                        <span>{item.title}</span>
                      </p>
                    )}
                  </SidebarMenuButton>
                  {item.subItems ? (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <subItem.icon />
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
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
