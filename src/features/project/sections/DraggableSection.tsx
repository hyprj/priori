import { ISection } from "src/types/types";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function DraggableSection({ section }: { section: ISection }) {
  return (
    <section className="m-4" key={section.id}>
      <ProjectSectionHeader section={section} />
    </section>
  );
}
