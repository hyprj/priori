import { DragOverlay, UniqueIdentifier } from "@dnd-kit/core";
import { ITask } from "src/types/types";
import { ProjectTask } from "../task/ProjectTask";

export function DragTaskOverlay({
  activeId,
  task,
}: {
  activeId: UniqueIdentifier;
  task: ITask;
}) {
  return (
    <DragOverlay>
      {activeId && <ProjectTask isDragged={true} task={task} />}
    </DragOverlay>
  );
}
