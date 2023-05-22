import { DBPomodoro } from "src/types/dbTypes";
import { TimerProps } from "../store/timerSlice";
import { SettingsProps } from "../store/settingsSlice";
import { DbProps } from "../store/dbSlice";

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

export function dbPomodoroToStoreProps(
  pomodoro: DBPomodoro
): TimerProps & SettingsProps & DbProps {
  const res: TimerProps & SettingsProps & DbProps = {
    autoStartBreak: pomodoro.auto_start_break,
    autoStartPomodoro: pomodoro.auto_start_pomodoro,
    length: {
      pomodoro: pomodoro.length_pomodoro,
      "short-break": pomodoro.length_short_break,
      "long-break": pomodoro.length_long_break,
    },
    mode: pomodoro.mode,
    isNew: pomodoro.isNew,
    timeleft: pomodoro.timeleft,
    isRunning: false,
    timer: null,
    pomodoro_id: pomodoro.id,
  };

  return res;
}
