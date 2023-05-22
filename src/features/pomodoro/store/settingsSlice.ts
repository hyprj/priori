import { StateCreator } from "zustand";
import { PomodoroState } from ".";
import { TimerMode } from "./timerSlice";

const DEFAULT_SETTINGS_PROPS: SettingsProps = {
  autoStartBreak: false,
  autoStartPomodoro: false,
  length: {
    pomodoro: 1500,
    "long-break": 900,
    "short-break": 300,
  },
};

export interface SettingsProps {
  autoStartPomodoro: boolean;
  autoStartBreak: boolean;
  length: {
    pomodoro: number;
    "short-break": number;
    "long-break": number;
  };
}

export interface SettingsSlice extends SettingsProps {
  changeLength: (mode: TimerMode, seconds: number) => void;
  updateSettings: (settings: SettingsProps) => void;
}
export const createSettingsSlice: StateCreator<
  PomodoroState,
  [],
  [],
  SettingsSlice
> = (set, get) => ({
  ...DEFAULT_SETTINGS_PROPS,
  changeLength: (mode: TimerMode, seconds: number) => {
    set({
      length: { ...get().length, [mode]: seconds },
      timeleft: get().mode === mode && get().isNew ? seconds : get().timeleft,
    });
  },
  updateSettings: (settings: SettingsProps) => {
    get().changeLength("pomodoro", settings.length.pomodoro);
    get().changeLength("short-break", settings.length["short-break"]);
    get().changeLength("long-break", settings.length["long-break"]);
    set(settings);
  },
});
