import { StateCreator } from "zustand";
import { PomodoroState } from ".";

export const DEFAULT_TIMER_PROPS: TimerProps = {
  timer: null,
  isRunning: false,
  mode: "pomodoro",
  timeleft: 1500,
  isNew: true,
};

export type TimerMode = "pomodoro" | "short-break" | "long-break";

export interface TimerProps {
  timer: null | number;
  isRunning: boolean;
  mode: TimerMode;
  timeleft: number;
  isNew: boolean;
}

export interface TimerSlice extends TimerProps {
  start: () => void;
  stop: () => void;
  reset: () => void;
  toggle: () => void;
  changeMode: (mode: TimerMode) => void;
}
export const createTimerSlice: StateCreator<
  PomodoroState,
  [],
  [],
  TimerSlice
> = (set, get) => {
  const start = () => {
    clearInterval(get().timer!);
    startTimerLoop();
  };

  const stop = () => {
    clearInterval(get().timer!);
    set({ timer: null, isRunning: false });
  };
  const reset = () => {};

  const toggle = () => (get().isRunning ? get().stop() : get().start());

  const changeMode = (mode: TimerMode) => {
    get().stop();
    // console.log("wtf");
    get().updatePomodoro({ mode: mode });
    set({ mode, timeleft: get().length[mode] as number });
  };
  const startTimerLoop = () => {
    const timerId: any = setInterval(() => {
      tick();
      checkTimer();
    }, 1);
    set({ timer: timerId, isRunning: true, isNew: false });
  };

  const tick = () => {
    set({ timeleft: get().timeleft - 1 });
  };

  const checkTimer = () => {
    if (get().timeleft <= 0) {
      stop();
      changeMode(get().mode === "pomodoro" ? "short-break" : "pomodoro");

      const mode = get().mode;
      if (mode === "pomodoro" && get().autoStartPomodoro) {
        start();
      } else if (mode === "short-break" && get().autoStartBreak) {
        start();
      }
    }
  };

  return {
    ...DEFAULT_TIMER_PROPS,
    start,
    stop,
    reset,
    toggle,
    changeMode,
  };
};
