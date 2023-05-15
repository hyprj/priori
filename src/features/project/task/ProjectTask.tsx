import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ITask } from "src/types/types";

export function ProjectTask({
  task,
  isDragged,
  placeholderBg = false,
}: {
  task: ITask;
  isDragged?: boolean;
  placeholderBg?: boolean;
}) {
  return (
    <div
      data-task-id={task.id}
      className={`my-4 border-b-[1px] bg-white dark:border-white/10 dark:bg-slate-700 ${
        isDragged ? "shadow-xl" : ""
      } ${placeholderBg ? " z-30 bg-gray-100 dark:bg-gray-800" : ""}`}
    >
      <div className={`flex ${placeholderBg ? "opacity-0" : ""}`}>
        <CheckCircleIcon className="mr-2 h-6 text-gray-400" strokeWidth={0.5} />
        <div>
          <p className="pt-[3px]">{task.name}</p>
          {task.note && (
            <p className="text-cl-text-soft text-sm">{task.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}
