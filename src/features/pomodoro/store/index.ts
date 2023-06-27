import { StoreApi, UseBoundStore, create } from "zustand";
import { TimerProps, TimerSlice, createTimerSlice } from "./timerSlice";
import { SettingsSlice, createSettingsSlice } from "./settingsSlice";
import { DbSlice, createDbSlice } from "./dbSlice";
import { TasksProps, TasksSlice, createTasksSlice } from "./tasksSlice";

export interface PomodoroState
  extends TimerSlice,
    SettingsSlice,
    DbSlice,
    TasksSlice {
  initiliazeStore: (timer?: TimerProps, tasks?: TasksProps) => void;
  isInitialized: boolean;
}

export const createPomodoroStore = () => {
  return create<PomodoroState>()((set, get, api) => ({
    ...createTimerSlice(set, get, api),
    ...createSettingsSlice(set, get, api),
    ...createDbSlice(set, get, api),
    ...createTasksSlice(set, get, api),
    initiliazeStore: (timer, tasks) => {
      set({ ...timer, ...tasks, isInitialized: true });
    },
    isInitialized: false,
  }));
};

export type PomodoroStore = UseBoundStore<StoreApi<PomodoroState>>;
