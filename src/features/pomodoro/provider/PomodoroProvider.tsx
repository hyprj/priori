import { createContext, useEffect, useRef } from "react";
import { PomodoroStore, createPomodoroStore } from "../store/index";
import { getPomodoro } from "@services/db";
import { useAuth } from "@features/auth/AuthProvider";
import { dbPomodoroToStoreProps } from "../utils/utils";

export const PomodoroContext = createContext<PomodoroStore | null>(null);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const pomodoroStore = useRef(createPomodoroStore()).current;
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    getPomodoro(user.id).then((pomodoro) => {
      pomodoroStore
        .getState()
        .initiliazeStore(dbPomodoroToStoreProps(pomodoro[0]));
    });
  }, []);

  return (
    <PomodoroContext.Provider value={pomodoroStore}>
      {children}
    </PomodoroContext.Provider>
  );
}
