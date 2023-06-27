import { useState } from "react";
import { queryClient } from "../../../../main";
import { DBPomodoroTask, IProject, ISection, ITask } from "src/types/types";
import { Listbox } from "@headlessui/react";
import { Button } from "@components/button/Button";
import { createPomodoroTask } from "@services/db";
import { useMutation } from "react-query";
import { useAuth } from "@features/auth/AuthProvider";

export function PomodoroTaskForm() {
  const { user } = useAuth();
  const [estPomodoros, setEstPomodoros] = useState<string | number>(1);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const projects = queryClient.getQueryData("projects") as IProject[];

  const handlePomodorosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numericValue = Number(e.target.value);
    if (numericValue > 20) {
      numericValue = 20;
      setEstPomodoros(numericValue);
    } else {
      setEstPomodoros(e.target.value);
    }
  };

  const { mutateAsync } = useMutation(
    "pomodoro_tasks",
    (pomodoroTask: Omit<DBPomodoroTask, "id" | "created_at" | "done">) =>
      createPomodoroTask(pomodoroTask)
  );

  const handleSubmit = async () => {
    const taskObj: Omit<DBPomodoroTask, "id" | "created_at" | "done"> = {
      est: Number(estPomodoros),
      task_id: selectedTask?.id as string,
      user_id: user?.id as string,
    };
    await mutateAsync(taskObj);
  };

  return (
    <div className="mt-8 rounded bg-neutral-50 px-4 py-2 shadow">
      <div className="flex items-center">
        <Listbox value={selectedProject} onChange={setSelectedProject}>
          <div className="relative w-44">
            <Listbox.Button className="w-full rounded bg-neutral-100 px-4 py-1">
              {selectedProject?.name ? (
                selectedProject.name
              ) : (
                <span className="text-gray-400">select project</span>
              )}
            </Listbox.Button>
            <Listbox.Options className="absolute rounded bg-white">
              <div className="mt-2 w-44">
                {projects?.map((project: IProject) => (
                  <Listbox.Option
                    className="w-full rounded px-4 hover:cursor-pointer hover:bg-neutral-100"
                    key={project.id}
                    value={project}
                  >
                    {project.name}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </div>
        </Listbox>
        <span className="px-2 text-3xl"> / </span>
        <Listbox
          disabled={selectedProject ? false : true}
          onChange={setSelectedTask}
        >
          <div className="relative w-44">
            <Listbox.Button
              className={({ disabled }) =>
                `${
                  disabled ? "cursor-not-allowed" : ""
                } w-full rounded bg-neutral-100 px-4 py-1`
              }
            >
              {selectedTask?.name ? (
                <span className="line-clamp-1 text-ellipsis">
                  {selectedTask.name}
                </span>
              ) : (
                <span className=" text-gray-400">select task</span>
              )}
            </Listbox.Button>
            <Listbox.Options className="absolute rounded bg-white">
              <div className="mt-2 w-44">
                {selectedProject?.sections?.map((section: ISection) => (
                  <div className="w-full">
                    <p className="mt-2 text-sm font-semibold">{section.name}</p>
                    {section.tasks.map((task: ITask) => (
                      <Listbox.Option
                        className="line-clamp-1 w-full px-4 hover:cursor-pointer hover:bg-neutral-100"
                        value={task}
                        key={task.id}
                      >
                        {task.name}
                      </Listbox.Option>
                    ))}
                  </div>
                ))}
              </div>
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold">Est pomodoros</p>
        <div>
          <input
            className="rounded bg-neutral-100"
            type="number"
            value={estPomodoros}
            onChange={handlePomodorosChange}
            min={0}
            max={20}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={Number(estPomodoros) > 0 && selectedTask ? false : true}
          onClick={handleSubmit}
          variant="action"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
