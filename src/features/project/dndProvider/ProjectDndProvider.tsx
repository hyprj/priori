import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { updateTask } from "@services/db";
import { IProject, ISection } from "src/types/types";
import {
  moveTaskToSection,
  reOrderTasks,
  sortByOrder,
  getUpdatedRows,
  sortSectionsWithTasks,
} from "../utils/utils";

export function ProjectDndProvider({
  children,
  items,
  setItems,
  setActiveId,
  project,
}: {
  children: React.ReactNode;
  items: ISection[];
  setItems: React.Dispatch<React.SetStateAction<ISection[]>>;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  project: IProject;
}) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string | null);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!active || !over) return;

    const activeSectionId = active.data.current!.sortable.containerId;
    const overSectionId = over.data.current!.sortable.containerId;

    if (activeSectionId !== overSectionId) {
      const clonedSections = structuredClone(items);
      const [activeSection, overSection] = getSections(
        clonedSections,
        activeSectionId,
        overSectionId
      );
      const task = activeSection!.tasks.find((task) => task.id === active.id);

      if (!task || !activeSection || !overSection) return;

      moveTaskToSection(task, activeSection, overSection);
      setItems(sortSectionsWithTasks(clonedSections));
    }
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    if (!active || !over) return;

    const overSectionId = over.data?.current?.sortable?.containerId;

    if (!overSectionId) return;

    const clonedSections = structuredClone(items);
    const clonedOverSection = clonedSections.find(
      (section) => section.id === overSectionId
    );

    const activeTaskId = active.id;

    if (!clonedOverSection) return;

    const droppedIndex = clonedOverSection.tasks.findIndex(
      (task) => task.id === over.id
    );

    reOrderTasks(clonedOverSection.tasks, activeTaskId as string, droppedIndex);
    sortByOrder(clonedOverSection.tasks);
    setItems(clonedSections);
    const updatedRows = getUpdatedRows(project.sections, clonedSections);

    await Promise.all(updatedRows.map(updateTask));
    setActiveId(null);
  };

  const getSections = (
    sections: ISection[],
    activeSectionId: string,
    overSectionId: string
  ) => {
    const activeSection = sections.find(
      (section) => section.id === activeSectionId
    );
    const overSection = sections.find(
      (section) => section.id === overSectionId
    );
    return [activeSection, overSection];
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
}
