import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSidebarContext } from "./SidebarProvider";
import { SidebarItem } from "./SidebarItem";
import { SidebarNav } from "./SidebarNav";
import { useEffect } from "react";

export function Sidebar() {
  const { isOpen, toggle, close } = useSidebarContext();

  useEffect(() => {
    const width = window.screen.width;
    if (width < 800) {
      close();
    }
  }, []);

  return (
    <>
      <div
        onClick={toggle}
        className={
          isOpen ? "fixed inset-0 bg-black bg-opacity-25 lg:hidden" : ""
        }
      />
      <aside
        className={`fixed bg-neutral-50 z-10 top-0 lg:top-auto transition-transform ${
          isOpen ? "" : "-translate-x-56"
        } 500ms bg-white h-full shadow-sm shadow-zinc-400 pt-4 px-4 flex-shrink-0 font-abhaya w-56`}
      >
        <XMarkIcon onClick={toggle} className="h-8 ml-auto lg:hidden" />
        <SidebarNav>
          <SidebarItem to="/app" name="Strona główna" />
          <SidebarItem to="/app/projects" name="Projekty" />
        </SidebarNav>
      </aside>
    </>
  );
}