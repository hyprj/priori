import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSidebarContext } from "./SidebarProvider";
import { SidebarItem } from "./SidebarItem";
import { SidebarNav } from "./SidebarNav";
import { useEffect, useRef } from "react";
import { SideBarGroup } from "./SidebarGroup";
import { useQuery } from "react-query";
import { getProjects } from "@services/db";
import { AddProject } from "@features/addProject/AddProject";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@features/auth/AuthProvider";

export function Sidebar() {
  const { user } = useAuth()!;
  const { isOpen, toggle, close, open } = useSidebarContext();
  const { data: projects } = useQuery(
    ["project"],
    () => getProjects(user!.id),
    {
      suspense: true,
    }
  );
  const widthRef = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      widthRef.current = window.innerWidth;
      if (window.innerWidth! < 800) {
        close();
      }
    };

    if (window.innerWidth > 800) {
      open();
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
        className={`fixed top-0 z-50 bg-neutral-50 pt-16 transition-transform dark:bg-slate-600 lg:top-auto ${
          isOpen ? "" : "-translate-x-56"
        } 500ms  h-full w-56 flex-shrink-0 px-4 pt-4 shadow-sm `}
      >
        <XMarkIcon onClick={toggle} className="ml-auto h-8 lg:hidden" />
        <SidebarNav>
          <SidebarItem
            to="/app"
            name="Today"
            onClick={() => widthRef.current! < 800 && close()}
          />
          <SidebarItem
            to="/app/projects"
            name="Projects"
            onClick={() => widthRef.current! < 800 && close()}
          />
        </SidebarNav>
        <SideBarGroup
          title="Projects"
          headerElement={
            <AddProject buttonContent={<PlusIcon className="h-3" />} />
          }
        >
          <SidebarNav>
            {projects &&
              projects.map((project) => (
                <SidebarItem
                  key={project.id}
                  to={`/app/projects/${project.id}`}
                  name={project.name}
                  onClick={() => widthRef.current! < 800 && close()}
                />
              ))}
          </SidebarNav>
        </SideBarGroup>
      </aside>
    </>
  );
}
