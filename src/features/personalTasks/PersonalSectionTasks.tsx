import { ProjectTask } from "@features/project/task/ProjectTask";
import { deletePersonalTask } from "@services/db";
import { DBPersonalTask } from "src/types/dbTypes";

export function PersonalSectionTasks({ tasks }: { tasks: DBPersonalTask[] }) {
  return (
    <div>
      {tasks.length === 0 && <p className="text-gray-400">No tasks</p>}
      {tasks.map((task) => (
        <ProjectTask
          task={task}
          key={task.id}
          onDone={() => deletePersonalTask(task.id)}
        />
      ))}
    </div>
  );
}
