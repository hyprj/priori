import { PomodoroState } from ".";
import { TimerMode } from "./timerSlice";

export interface SettingsProps {
  autoStartPomodoro: boolean;
  autoStartBreak: boolean;
  length: {
    pomodoro: number;
    "short-break": number;
    "long-break": number;
  };
}

export interface SettingsState extends SettingsProps {
  changeLength: (mode: TimerMode, seconds: number) => void;
  updateSettings: (settings: SettingsProps) => void;
}
export const createSettingsSlice = (
  set: (
    partial:
      | PomodoroState
      | Partial<PomodoroState>
      | ((state: PomodoroState) => PomodoroState | Partial<PomodoroState>),
    replace?: boolean | undefined
  ) => void,
  get: () => PomodoroState,
  data: SettingsProps
) => ({
  ...data,
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
