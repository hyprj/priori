import { createStore } from "zustand";
import { TimerState, TimerProps, createTimerSlice } from "./timerSlice";
import {
  SettingsProps,
  SettingsState,
  createSettingsSlice,
} from "./settingsSlice";

export interface PomodoroState extends TimerState, SettingsState {}

const DEFAULT_TIMER_PROPS: TimerProps = {
  timer: null,
  isRunning: false,
  mode: "pomodoro",
  timeleft: 1500,
  isNew: true,
};
const DEFAULT_SETTINGS_PROPS: SettingsProps = {
  autoStartBreak: false,
  autoStartPomodoro: false,
  length: {
    pomodoro: 1500,
    "long-break": 900,
    "short-break": 300,
  },
};

export const createPomodoroStore = (
  initTimerProps?: Partial<TimerProps>,
  initSettingsProps?: Partial<SettingsProps>
) => {
  return createStore<PomodoroState>()((set, get) => ({
    ...createTimerSlice(set, get, {
      ...DEFAULT_TIMER_PROPS,
      ...initTimerProps,
    }),
    ...createSettingsSlice(set, get, {
      ...DEFAULT_SETTINGS_PROPS,
      ...initSettingsProps,
    }),
  }));
};

export type PomodoroStore = ReturnType<typeof createPomodoroStore>;
