import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSidebarContext } from "./SidebarProvider";
import { SidebarItem } from "./SidebarItem";
import { SidebarNav } from "./SidebarNav";
import { useEffect } from "react";
import { SideBarGroup } from "./SidebarGroup";
import { useQuery } from "react-query";
import { getProjects } from "@services/db";
import { useUser } from "@features/auth/useUser";

export function Sidebar() {
  const user = useUser()!;
  const { isOpen, toggle, close } = useSidebarContext();
  const { data: projects } = useQuery("projects", () => getProjects(user?.id), {
    suspense: true,
  });

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
          isOpen ? "fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden" : ""
        }
      />
      <aside
        className={`fixed top-0 z-50 bg-neutral-50 pt-16 transition-transform dark:bg-slate-700/80 lg:top-auto ${
          isOpen ? "" : "-translate-x-56"
        } 500ms  h-full w-56 flex-shrink-0 px-4 pt-4 font-abhaya shadow-sm `}
      >
        <XMarkIcon onClick={toggle} className="ml-auto h-8 lg:hidden" />
        <SidebarNav>
          <SidebarItem to="/app" name="Dashboard" />
          <SidebarItem to="/app/projects" name="Projects" />
        </SidebarNav>
        <SideBarGroup title="Projects">
          <SidebarNav>
            {projects &&
              projects.map((project) => (
                <SidebarItem
                  key={project.id}
                  to={`/app/projects/${project.id}`}
                  name={project.name}
                />
              ))}
          </SidebarNav>
        </SideBarGroup>
      </aside>
    </>
  );
}
