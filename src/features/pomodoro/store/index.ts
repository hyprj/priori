import { StoreApi, UseBoundStore, create } from "zustand";
import { TimerSlice, createTimerSlice } from "./timerSlice";
import { SettingsSlice, createSettingsSlice } from "./settingsSlice";

export interface PomodoroState extends TimerSlice, SettingsSlice {}

export const createPomodoroStore = () => {
  return create<PomodoroState>()((set, get, api) => ({
    ...createTimerSlice(set, get, api),
    ...createSettingsSlice(set, get, api),
  }));
};

export type PomodoroStore = UseBoundStore<StoreApi<PomodoroState>>;
