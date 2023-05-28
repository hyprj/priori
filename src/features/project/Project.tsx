import { IProject, ITask } from "src/types/types";
import { useEffect, useState } from "react";
import { AddSection } from "./sections/AddSection";
import { getActiveItem, sortSectionsWithTasks } from "./utils/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragTaskOverlay } from "./overlay/DragTaskOverlay";
import { ProjectSection } from "./sections/ProjectSection";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectDndProvider } from "./dndProvider/ProjectDndProvider";

export function Project({ project }: { project: IProject }) {
  const [sections, setSections] = useState(
    sortSectionsWithTasks(project.sections)
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setSections(sortSectionsWithTasks(project.sections));
  }, [project]);

  return (
    <ProjectDndProvider
      items={sections}
      setItems={setSections}
      setActiveId={setActiveId}
      project={project}
    >
      <div className="mt-8">
        <ProjectHeader project={project} />
        {sections.map((section) => (
          <div key={section.id}>
            <SortableContext
              items={section.tasks}
              strategy={verticalListSortingStrategy}
              id={section.id}
            >
              <ProjectSection
                key={section.id}
                sectionOrder={section.order}
                projectId={project.id}
                section={section}
                sections={sections}
                activeId={activeId}
              />
            </SortableContext>
          </div>
        ))}
        <AddSection
          sections={sections}
          projectId={project.id}
          sectionOrder={project.sections.length}
        />
      </div>
      <DragTaskOverlay
        activeId={activeId as UniqueIdentifier}
        task={getActiveItem(activeId as UniqueIdentifier, sections) as ITask}
      />
    </ProjectDndProvider>
  );
}
