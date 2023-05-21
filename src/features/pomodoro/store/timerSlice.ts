import { PomodoroState } from ".";

export type TimerMode = "pomodoro" | "short-break" | "long-break";
// export const SETTINGS_LENGHT_KEYS: {
//   [key in TimerMode]: keyof PomodoroState;
// } = {
//   pomodoro: "pomodoroLength",
//   "short-break": "shortBreakLength",
//   "long-break": "longBreakLength",
// };

export interface TimerProps {
  timer: null | number;
  isRunning: boolean;
  mode: TimerMode;
  timeleft: number;
  isNew: boolean;
}

export interface TimerState extends TimerProps {
  start: () => void;
  stop: () => void;
  reset: () => void;
  toggle: () => void;
  changeMode: (mode: TimerMode) => void;
}
export const createTimerSlice = (
  set: (
    partial:
      | PomodoroState
      | Partial<PomodoroState>
      | ((state: PomodoroState) => PomodoroState | Partial<PomodoroState>),
    replace?: boolean | undefined
  ) => void,
  get: () => PomodoroState,
  data: TimerProps
) => ({
  ...data,
  start: () => {
    clearInterval(get().timer!);
    const timerId: any = setInterval(() => {
      set((state) => ({ timeleft: state.timeleft - 1 }));
    }, 1000);
    set({ timer: timerId, isRunning: true, isNew: false });
  },
  stop: () => {
    clearInterval(get().timer!);
    set({ timer: null, isRunning: false });
  },
  reset: () => {},
  toggle: () => (get().isRunning ? get().stop() : get().start()),
  changeMode: (mode: TimerMode) => {
    get().stop();

    set({ mode, timeleft: get().length[mode] as number });
  },
});
