import { usePomodoroContext } from "@features/pomodoro/hooks/usePomodoroContext";
import { PomodoroTask } from "@features/pomodoro/store/tasksSlice";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AddPomodoroTask } from "../addPomooroTask/AddPomodoroTask";

export function PomodoroTask({ task }: { task: PomodoroTask }) {
  return (
    <div className="flex items-center justify-between rounded bg-neutral-200/75 px-4 py-2 shadow">
      <p>{task.task.name}</p>
      <div className="text-gray-600">
        <span className="text-lg">{task.donePomodoros}</span>
        <span>{` / ${task.estPomodoros}`}</span>
        <Bars3Icon className="ml-4 inline-block h-6" />
      </div>
    </div>
  );
}

export function PomodoroTasks() {
  const tasks = usePomodoroContext((state) => state.tasks);
  return (
    <div className="mt-8">
      {tasks.map((task) => (
        <PomodoroTask task={task} key={task.task.id} />
      ))}
      <AddPomodoroTask />
    </div>
  );
}
