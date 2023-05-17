import { ITask } from "../../../types/types";
import { PriorityListbox } from "@components/priorityListbox/PriorityListbox";
import { DBPersonalTask } from "src/types/dbTypes";
import { CheckIcon } from "@components/checkIcon/CheckIcon";

export function ProjectTask({
  task,
  isDragged,
  placeholderBg = false,
  onDone,
}: {
  task: ITask | DBPersonalTask;
  isDragged?: boolean;
  placeholderBg?: boolean;
  onDone?: () => void;
}) {
  return (
    <div
      data-task-id={task.id}
      className={`my-4 border-b-[1px] bg-white dark:border-white/10 dark:bg-slate-700 ${
        isDragged ? "shadow-xl" : ""
      } ${placeholderBg ? " z-30 bg-gray-100 dark:bg-gray-800" : ""}`}
    >
      <div className={`flex py-1  px-2${placeholderBg ? "opacity-0" : ""}`}>
        <CheckIcon onClick={onDone} />
        <div className="flex flex-grow justify-between">
          <div>
            <p className="pt-[3px]">{task.name}</p>
            {task.note && (
              <p className="text-cl-text-soft text-sm">{task.note}</p>
            )}
          </div>
          <div>
            {task.priority && (
              <PriorityListbox
                selected={task.priority}
                handleClick={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
