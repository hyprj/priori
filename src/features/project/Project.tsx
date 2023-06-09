import { IProject, ITask } from "src/types/types";
import { useEffect, useState } from "react";
import { AddSection } from "./sections/AddSection";
import {
  getActiveItem,
  getUpdatedRows,
  moveTaskToSection,
  orderProject,
  reOrderTasks,
  sortByOrder,
} from "./utils/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragTaskOverlay } from "./overlay/DragTaskOverlay";
import { ProjectSection } from "./sections/ProjectSection";
import { updateTask } from "@services/db";
import { ProjectHeader } from "./ProjectHeader";

export function Project({ project }: { project: IProject }) {
  const [items, setItems] = useState(orderProject(project));
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setItems(orderProject(project));
  }, [project]);

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
      const clonedProject = structuredClone(items);
      const [activeSection, overSection] = getSections(
        clonedProject,
        activeSectionId,
        overSectionId
      );
      const task = activeSection!.tasks.find((task) => task.id === active.id);

      if (!task || !activeSection || !overSection) return;

      moveTaskToSection(task, activeSection, overSection);
      setItems(clonedProject);
    }
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    if (!active || !over) return;

    const overSectionId = over.data?.current?.sortable?.containerId;

    if (!overSectionId) return;

    const clonedProject = structuredClone(items);
    const clonedOverSection = clonedProject.sections.find(
      (section) => section.id === overSectionId
    );

    const activeTaskId = active.id;

    if (!clonedOverSection) return;

    const droppedIndex = clonedOverSection.tasks.findIndex(
      (task) => task.id === over.id
    );

    reOrderTasks(clonedOverSection.tasks, activeTaskId as string, droppedIndex);
    sortByOrder(clonedOverSection.tasks);
    setItems(clonedProject);
    const updatedRows = getUpdatedRows(
      project.sections,
      clonedProject.sections
    );

    await Promise.all(updatedRows.map(updateTask));
    setActiveId(null);
  };

  const getSections = (
    project: IProject,
    activeSectionId: string,
    overSectionId: string
  ) => {
    const activeSection = project.sections.find(
      (section) => section.id === activeSectionId
    );
    const overSection = project.sections.find(
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
      <div className="mt-8">
        <ProjectHeader project={project} />
        {items.sections.map((section) => (
          <div key={section.id}>
            <SortableContext
              items={section.tasks}
              strategy={verticalListSortingStrategy}
              id={section.id}
            >
              <ProjectSection
                key={section.id}
                sectionOrder={section.order}
                projectId={project.id}
                section={section}
                sections={items.sections}
                activeId={activeId}
              />
            </SortableContext>
          </div>
        ))}
        <AddSection
          sections={items.sections}
          projectId={project.id}
          sectionOrder={project.sections.length}
        />
      </div>
      <DragTaskOverlay
        activeId={activeId as UniqueIdentifier}
        task={
          getActiveItem(activeId as UniqueIdentifier, items.sections) as ITask
        }
      />
    </DndContext>
  );
}
