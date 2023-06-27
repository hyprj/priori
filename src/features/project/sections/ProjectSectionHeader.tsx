export function ProjectSectionHeader({
  name,
  tasksAmount,
}: {
  name: string;
  tasksAmount: number;
}) {
  return (
    <header className="text-md sticky top-[4.7rem] z-10 mb-2 flex items-baseline gap-6 border-b-[1px] bg-white px-2 py-1 font-semibold dark:border-white/10 dark:bg-slate-600">
      <span>{name}</span>
      <span className="text-xs text-gray-500">{`${tasksAmount} tasks`}</span>
    </header>
  );
}
