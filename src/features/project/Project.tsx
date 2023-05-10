import { Button } from "@components/button/Button";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { IProject, Priority, ITask } from "../../types/types";
import { createTask } from "@services/db";

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
                  className="my-4 border-b-[1px] border-slate-200"
                >
                  <div className="relative">
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
                </div>
              ))}
            <footer>
              <AddTask sectionId={section.id} />
            </footer>
          </section>
        ))}
    </div>
  );
}

export interface Inputs {
  name: string;
  note?: string;
  priority: Priority;
}

export function AddTask({ sectionId }: { sectionId: string }) {
  const [isActive, setIsActive] = useState(false);
  const { mutateAsync, isSuccess } = useMutation((task: Omit<ITask, "id">) =>
    createTask(task)
  );

  const handleSubmit = async (data: Inputs) => {
    const task: Omit<ITask, "id"> = {
      name: data.name,
      note: data.note || null,
      priority: data.priority,
      section_id: sectionId,
      order: 0,
    };
    console.log(data);
    await mutateAsync(task);
    console.log(isSuccess);
    setIsActive(false);
  };

  const handleEscape = (e: KeyboardEvent) =>
    e.key === "Escape" && setIsActive(false);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isActive]);

  return (
    <>
      {!isActive && (
        <PlusIcon
          className="h-6"
          strokeWidth={0.5}
          onClick={() => setIsActive(true)}
        />
      )}
      {isActive && (
        <>
          <div
            className="fixed z-0 inset-0"
            onClick={() => setIsActive(false)}
          ></div>
          <div className="relative z-10">
            <AddTaskDialog
              onSubmit={handleSubmit}
              onClose={() => setIsActive(false)}
            />
          </div>
        </>
      )}
    </>
  );
}

export function AddTaskDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Inputs) => void;
}) {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const isDisabled = !formState.isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-[1px] rounded-lg">
        <div className="flex p-3 flex-col">
          <input
            {...register("name", { required: true })}
            className="outline-none mb-2 font-semibold text-sm"
            type="text"
            placeholder="Task name"
          />
          <textarea
            {...register("note")}
            className="text-xs outline-none mb-1 w-full text-gray-600 resize-y"
            placeholder="Note"
          />
        </div>
        <div className="p-2 border-t-[1px] flex justify-between">
          <div className="">
            <p className="text-sm font-semibold">priority</p>
            <select {...register("priority")}>
              <option defaultChecked value={1}>
                low
              </option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="action" type="submit" disabled={isDisabled}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
