"use client";
import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "News",
    url: "/news",
    icon: Inbox,
  },
  {
    title: "Report",
    url: "/report",
    icon: Calendar,
  },
  {
    title: "Business",
    url: "/business",
    icon: Search,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { data: session } = useSession();
  console.log(session);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center gap-2 text-green-600"
          >
            <Image src="/logo.svg" width={32} height={32} alt="CConnect Logo" />
            <span className={`${open ? "inline" : "hidden"}`}>CConnect</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg pl-4">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {session?.user ? (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {session?.user?.email}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuButton onClick={() => redirect("/auth/signin")}>
              Sign In
            </SidebarMenuButton>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
