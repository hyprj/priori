import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { IProject } from "src/types/types";

export function Project({ project }: { project: IProject }) {
  return (
    <div>
      {project.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <section className="m-4 mb-8" key={section.id}>
            <header className="font-semibold mb-2 text-md border-b-[1px] border-slate-200 flex items-baseline gap-6">
              <span>{section.name}</span>
              <span className="text-xs text-gray-500">
                {`${section.tasks.length} tasks`}
              </span>
            </header>
            {section.tasks
              .sort((a, b) => a.order - b.order)
              .map((task) => (
                <div
                  key={task.id}
                  data-task-id={task.id}
                  className="my-4  relative border-b-[1px] border-slate-200"
                >
                  <div className="absolute -left-7">m</div>
                  <div className="flex">
                    <CheckCircleIcon
                      className="h-6 mr-2 text-gray-400"
                      strokeWidth={0.5}
                    />
                    <div>
                      <p className="pt-[3px]">{task.name}</p>
                      {task.note && (
                        <p className="text-sm text-gray-700">{task.note}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            <footer>
              <PlusIcon className="h-6" strokeWidth={0.5} />
              <AddTaskDialog />
            </footer>
          </section>
        ))}
    </div>
  );
}

export function AddTaskDialog() {
  return (
    <div className="border-[1px] rounded">
      <div className="flex p-3 flex-col">
        <input type="text" placeholder="Task name" />
        <input type="text" placeholder="Note" />
      </div>
      <div className=" p-3 border-t-[1px]">
        <button>Cancel</button>
        <button>Add</button>
      </div>
    </div>
  );
}
