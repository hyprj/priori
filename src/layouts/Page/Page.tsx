import { useSidebarContext } from "@components/sidebar/SidebarProvider";

export function Page({
  children,
  noSidebar,
}: {
  children: React.ReactNode;
  noSidebar?: boolean;
}) {
  const isOpen = noSidebar ? false : useSidebarContext().isOpen;
  return (
    <div
      className={`transition-[margin-left] flex flex-grow  500ms ${
        isOpen ? "lg:ml-56" : "ml-0"
      }`}
    >
      <div className={`w-full animate-enter`}>{children}</div>
    </div>
  );
}
