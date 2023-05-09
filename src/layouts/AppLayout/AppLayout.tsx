import { Header } from "@components/header/Header";
import { QueryBoundaries } from "@components/queryBoundaries/QueryBoundaries";
import { Sidebar } from "@components/sidebar/Sidebar";
import { SidebarProvider } from "@components/sidebar/SidebarProvider";
import { useUser } from "@features/auth/useUser";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-grow">
          {user && <Sidebar />}
          <QueryBoundaries>{children}</QueryBoundaries>
        </main>
      </div>
    </SidebarProvider>
  );
}
