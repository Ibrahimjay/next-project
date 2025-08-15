import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavHeader from "./nav-header";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full">
        <SidebarTrigger />
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
