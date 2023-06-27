import { Button } from "@components/button/Button";
import { usePomodoroContext } from "@features/pomodoro/hooks/usePomodoroContext";
import { TimerMode } from "@features/pomodoro/store/timerSlice";
import { formatTime } from "@features/pomodoro/utils/utils";

const themes: { [key in TimerMode]: string } = {
  "long-break": "bg-blue-400/80",
  "short-break": "bg-yellow-500",
  pomodoro: "bg-red-500/80",
};

export function PomodoroTimer() {
  const { mode, timeleft, isRunning, toggle, changeMode, isInitialized } =
    usePomodoroContext((state) => state);

  function handleChangeMode(mode: TimerMode) {
    if (isRunning) {
      const answer = confirm("Are you sure you want to change mode?");
      if (answer) {
        changeMode(mode);
      }
    } else {
      changeMode(mode);
    }
  }

  return (
    <div
      aria-label="pomodoro-timer"
      data-mode={mode}
      className={`flex flex-col items-center rounded-lg text-white dark:text-slate-700 ${themes[mode]} py-8  shadow-lg`}
    >
      <div className="flex gap-2">
        <Button
          onClick={() => handleChangeMode("pomodoro")}
          className={`hover:bg-white/20 ${
            mode === "pomodoro" ? "bg-black/10" : ""
          }`}
        >
          Pomodoro
        </Button>
        <Button
          onClick={() => handleChangeMode("short-break")}
          className={`hover:bg-white/20 ${
            mode === "short-break" ? "bg-black/10" : ""
          }`}
        >
          Short Break
        </Button>
        <Button
          onClick={() => handleChangeMode("long-break")}
          className={`hover:bg-white/20 ${
            mode === "long-break" ? "bg-black/10" : ""
          }`}
        >
          Long Break
        </Button>
      </div>
      <div
        className={`py-8 text-8xl font-semibold transition-opacity ${
          isInitialized ? "" : "opacity-0"
        }`}
      >
        {formatTime(timeleft)}
      </div>
      <button
        className={`150ms cursor-pointer rounded bg-white px-12 py-2 text-xl font-semibold uppercase text-black/80 transition-transform disabled:cursor-not-allowed  dark:bg-slate-600 dark:text-white ${
          isRunning ? "" : "-translate-y-1 shadow-[0_5px_0_0_rgba(0,0,0,0.2)]"
        }`}
        disabled={!isInitialized}
        onClick={() => toggle()}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}