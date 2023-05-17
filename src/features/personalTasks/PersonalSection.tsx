import { ProjectSectionHeader } from "@features/project/sections/ProjectSectionHeader";

export function PersonalSection({
  name,
  tasksAmount,
  children,
}: {
  name: string;
  tasksAmount: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <ProjectSectionHeader name={name} tasksAmount={tasksAmount} />
      {children}
    </div>
  );
}
