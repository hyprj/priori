export function ProjectSectionHeader({
  name,
  tasksAmount,
}: {
  name: string;
  tasksAmount: number;
}) {
  return (
    <header className="text-md mb-2 flex items-baseline gap-6 border-b-[1px] font-semibold dark:border-white/10">
      <span>{name}</span>
      <span className="text-xs text-gray-500">{`${tasksAmount} tasks`}</span>
    </header>
  );
}
