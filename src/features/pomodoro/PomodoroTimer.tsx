import { Button } from "@components/button/Button";
import { usePomodoroContext } from "./hooks/usePomodoroContext";
import { formatTime } from "./utils/utils";
import { TimerMode } from "./store/timerSlice";

const themes: { [key in TimerMode]: string } = {
  "long-break": "bg-blue-400/80",
  "short-break": "bg-yellow-500",
  pomodoro: "bg-red-500/80",
};

export function PomodoroTimer() {
  const { mode, timeleft, isRunning, toggle, changeMode } = usePomodoroContext(
    (state) => state
  );

  return (
    <div
      className={`flex flex-col items-center rounded-lg text-white dark:text-slate-700 ${themes[mode]} py-8  shadow-lg`}
    >
      <div className="flex gap-2">
        <Button
          onClick={() => changeMode("pomodoro")}
          className={`hover:bg-white/20 ${
            mode === "pomodoro" ? "bg-black/10" : ""
          }`}
        >
          Pomodoro
        </Button>
        <Button
          onClick={() => changeMode("short-break")}
          className={`hover:bg-white/20 ${
            mode === "short-break" ? "bg-black/10" : ""
          }`}
        >
          Short Break
        </Button>
        <Button
          onClick={() => changeMode("long-break")}
          className={`hover:bg-white/20 ${
            mode === "long-break" ? "bg-black/10" : ""
          }`}
        >
          Long Break
        </Button>
      </div>
      <div className="py-8 text-8xl font-semibold">{formatTime(timeleft)}</div>
      <button
        className={`150ms rounded bg-white px-12 py-2 text-xl font-semibold uppercase text-black/80 transition-transform  dark:bg-slate-600 dark:text-white ${
          isRunning ? "" : "-translate-y-1 shadow-[0_5px_0_0_rgba(0,0,0,0.2)]"
        }`}
        onClick={() => toggle()}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}
