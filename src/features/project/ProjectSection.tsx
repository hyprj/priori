import { ITask } from "src/types/types";
import { ProjectTask } from "./ProjectTask";

export function ProjectSection({
  name,
  tasks,
}: {
  name: string;
  tasks: ITask[];
}) {
  return (
    <section>
      <h2>{name}</h2>
      {tasks.map((task) => (
        <ProjectTask
          key={task.id}
          name={task.name}
          note={task.note}
          priority={task.priority}
        />
      ))}
    </section>
  );
}
