import { UniqueIdentifier } from "@dnd-kit/core";
import { IProject, ISection, ITask } from "src/types/types";

export function orderProject(project: IProject): IProject {
  const proj = structuredClone(project);
  proj.sections.sort((a, b) => a.order - b.order);
  proj.sections.forEach((section) => {
    section.tasks.sort((a, b) => a.order - b.order);
  });

  return proj;
}

export function getActiveItem(
  activeId: UniqueIdentifier,
  sections: ISection[]
) {
  let activeItem = null;
  for (const section of sections) {
    if (section.id === activeId) {
      activeItem = section;
      break;
    }
    for (const task of section.tasks) {
      if (task.id === activeId) {
        activeItem = task;
        break;
      }
    }
  }

  return activeItem;
}

export function moveTaskToSection(
  task: ITask,
  fromSection: ISection,
  toSection: ISection
) {
  const taskIndex = fromSection.tasks.findIndex((t) => t.id === task.id);
  fromSection.tasks.splice(taskIndex, 1);
  toSection.tasks.push({ ...task, section_id: toSection.id });
}

export function reOrderTasks(
  tasks: ITask[],
  activeTaskId: string,
  droppedIndex: number
) {
  const activeTaskOrder = tasks.findIndex((task) => task.id === activeTaskId);

  if (droppedIndex > activeTaskOrder) {
    tasks.map((task) => {
      if (task.order > activeTaskOrder && task.order <= droppedIndex) {
        task.order -= 1;
      }
    });
  } else if (droppedIndex < activeTaskOrder) {
    tasks.map((task) => {
      if (task.order < activeTaskOrder && task.order >= droppedIndex) {
        task.order += 1;
      }
    });
  }

  tasks[activeTaskOrder].order = droppedIndex;
}

export function reOrderSections(
  sections: ISection[],
  activeSectionId: string,
  droppedIndex: number
) {
  const activeSectionOrder = sections.findIndex(
    (section) => section.id === activeSectionId
  );

  if (droppedIndex > activeSectionOrder) {
    sections.map((section) => {
      if (section.order > activeSectionOrder && section.order <= droppedIndex) {
        section.order -= 1;
      }
    });
  } else if (droppedIndex < activeSectionOrder) {
    sections.map((section) => {
      if (section.order < activeSectionOrder && section.order >= droppedIndex) {
        section.order += 1;
      }
    });
  }

  sections[activeSectionOrder].order = droppedIndex;
}

export function sortByOrder<T extends { order: number }>(items: T[]) {
  return items.sort((a, b) => a.order - b.order);
}

export function getUpdatedRows(
  prevSections: ISection[],
  currSections: ISection[]
) {
  const updatedRows: ITask[] = [];

  const prevTasks = prevSections
    .reduce<ITask[]>((acc, section) => {
      acc.push(...section.tasks);
      return acc;
    }, [])
    .sort((a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0));

  const currTasks = currSections
    .reduce<ITask[]>((acc, section) => {
      acc.push(...section.tasks);
      return acc;
    }, [])
    .sort((a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0));

  prevTasks.forEach((prevTask, index) => {
    if (
      prevTask.order !== currTasks[index].order ||
      prevTask.section_id !== currTasks[index].section_id
    ) {
      updatedRows.push(currTasks[index]);
    }
  });

  return updatedRows;
}
