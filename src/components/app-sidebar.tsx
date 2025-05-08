"use client";
import { useContext, useEffect, useState, useTransition } from "react";
import { LayoutDashboardIcon, ChevronDown, CheckIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  SidebarHeader,
} from "@/components/ui/sidebar";
import { listConnectTree } from "@/actions";
import { ConnectTreeContext } from "@/context/connectTreeContext";
import { ConnectTree } from "@/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";

// Menu items.
const items = [
  {
    title: "My ConnectTree",
    url: "#",
    icon: LayoutDashboardIcon,
  },
];

export function AppSidebar() {
  const [isPending, setTransition] = useTransition();
  const [connectTreeList, setConnectTreeList] = useState([] as ConnectTree[]);
  const [selectedConnectTree, setSelectedConnectTree] = useState(
    {} as ConnectTree
  );
  const { setConnectTree } = useContext(ConnectTreeContext);

  useEffect(() => {
    setTransition(async () => {
      const connectTreeList = await listConnectTree();
      setConnectTreeList(connectTreeList);
      const defaultValue = connectTreeList[0];
      setConnectTree(defaultValue);
      setSelectedConnectTree(defaultValue);
    });
  }, [setConnectTree]);

  useEffect(() => {
    setSelectedConnectTree(selectedConnectTree);
  }, [selectedConnectTree]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {isPending && !connectTreeList.length ? (
          <Skeleton className="h-[32px] w-[175px]" />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {selectedConnectTree?.username}
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  {connectTreeList.map((item) => (
                    <DropdownMenuItem key={item.id}>
                      {selectedConnectTree.id === item.id && <CheckIcon />}
                      <span>{item.username}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
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
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SignedIn>
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: "flex !flex-row-reverse inline-flex",
              },
            }}
          />
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
