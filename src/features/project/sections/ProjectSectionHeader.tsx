import { ISection } from "src/types/types";

export function ProjectSectionHeader({ section }: { section: ISection }) {
  return (
    <header className="text-md mb-2 flex items-baseline gap-6 border-b-[1px] font-semibold dark:border-white/10">
      <span>{section.name}</span>
      <span className="text-xs text-gray-500">
        {`${section.tasks.length} tasks`}
      </span>
    </header>
  );
}
