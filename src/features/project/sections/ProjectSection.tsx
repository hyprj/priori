import { ISection } from "src/types/types";
import { SortableItem } from "../sortable/SortableItem";
import { ProjectTask } from "../task/ProjectTask";
import { AddSection } from "./AddSection";
import { ProjectSectionHeader } from "./ProjectSectionHeader";
import { SectionFooter } from "./SectionFooter";

export function ProjectSection({
  projectId,
  section,
  sectionOrder,
  activeId,
  sections,
}: {
  sections: ISection[];
  projectId: string;
  section: ISection;
  sectionOrder: number;
  activeId: string | null;
}) {
  return (
    <section className="m-4" key={section.id}>
      <AddSection
        sections={sections}
        projectId={projectId}
        sectionOrder={sectionOrder}
      />
      <ProjectSectionHeader section={section} />
      {section.tasks.map((task) => (
        <SortableItem key={task.id} id={task.id}>
          <ProjectTask task={task} placeholderBg={task.id === activeId} />
        </SortableItem>
      ))}
      {section.tasks.length === 0 && (
        <SortableItem id="PLACEHOLDER">
          <div className="h-8"></div>
        </SortableItem>
      )}
      <SectionFooter
        sectionId={section.id}
        newTaskOrder={section.tasks.length}
      />
    </section>
  );
}
