import { ProjectTask } from "@features/project/task/ProjectTask";
import { deletePersonalTask } from "@services/db";
import { DBPersonalTask } from "src/types/dbTypes";

export function PersonalSectionTasks({
  tasks,
  refetch,
}: {
  tasks: DBPersonalTask[];
  refetch: () => void;
}) {
  async function handleDelete(taskId: string) {
    await deletePersonalTask(taskId);
    refetch();
  }

  return (
    <div>
      {tasks.length === 0 && <p className="text-gray-400">No tasks</p>}
      {tasks.map((task) => (
        <ProjectTask
          task={task}
          key={task.id}
          onDone={() => handleDelete(task.id)}
        />
      ))}
    </div>
  );
}
