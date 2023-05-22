import { StoreApi, UseBoundStore, create } from "zustand";
import { TimerProps, TimerSlice, createTimerSlice } from "./timerSlice";
import {
  SettingsProps,
  SettingsSlice,
  createSettingsSlice,
} from "./settingsSlice";
import { DbSlice, createDbSlice } from "./dbSlice";

export interface PomodoroState extends TimerSlice, SettingsSlice, DbSlice {
  initiliazeStore: (data: TimerProps & SettingsProps) => void;
}

export const createPomodoroStore = () => {
  return create<PomodoroState>()((set, get, api) => ({
    ...createTimerSlice(set, get, api),
    ...createSettingsSlice(set, get, api),
    ...createDbSlice(set, get, api),
    initiliazeStore: (data) => {
      set(data);
    },
  }));
};

export type PomodoroStore = UseBoundStore<StoreApi<PomodoroState>>;
