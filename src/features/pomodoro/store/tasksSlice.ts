import { StateCreator } from "zustand";
import { PomodoroState } from ".";
import { ITask } from "src/types/types";

export interface PomodoroTask {
  task: ITask;
  donePomodoros: number;
  estPomodoros: number;
}

export const defaultTasks: PomodoroTask[] = [
  {
    task: {
      name: "Example task",
      order: 3,
      id: "2131244",
      section_id: "2134",
      note: "some note",
      priority: 1,
    },
    donePomodoros: 2,
    estPomodoros: 4,
  },
];

export interface TasksProps {
  tasks: any[];
}

const DEFAULT_TASKS_PROPS: TasksProps = {
  tasks: defaultTasks,
};

export interface TasksSlice extends TasksProps {}

export const createTasksSlice: StateCreator<
  PomodoroState,
  [],
  [],
  TasksSlice
> = (_, get) => ({
  ...DEFAULT_TASKS_PROPS,
});
