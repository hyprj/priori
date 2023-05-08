import { useSidebarContext } from "@components/sidebar/SidebarProvider";

export function Page({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebarContext();
  return (
    <div
      className={`transition-[margin-left] flex flex-grow  500ms ${
        isOpen ? "lg:ml-56" : "ml-0"
      }`}
    >
      <div className={` w-full animate-enter lg:mx-8`}>{children}</div>
    </div>
  );
}
