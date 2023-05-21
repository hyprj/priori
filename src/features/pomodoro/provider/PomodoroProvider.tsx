import { createContext, useRef } from "react";
import { PomodoroStore, createPomodoroStore } from "../store/index";

export const PomodoroContext = createContext<PomodoroStore | null>(null);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const pomodoroStore = useRef(createPomodoroStore()).current;
  return (
    <PomodoroContext.Provider value={pomodoroStore}>
      {children}
    </PomodoroContext.Provider>
  );
}
