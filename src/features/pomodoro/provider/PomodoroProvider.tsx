import { createContext, useEffect, useRef } from "react";
import { PomodoroStore, createPomodoroStore } from "../store/index";
import { getPomodoro, getPomodoroTasks } from "@services/db";
import { useAuth } from "@features/auth/AuthProvider";
import { dbPomodoroToStoreProps } from "../utils/utils";

export const PomodoroContext = createContext<PomodoroStore | null>(null);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const pomodoroStore = useRef(createPomodoroStore()).current;
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchPomodoro = async () => {
      const [settings, tasks] = await Promise.all([
        getPomodoro(user.id),
        getPomodoroTasks(user.id),
      ]);

      pomodoroStore
        .getState()
        .initiliazeStore(dbPomodoroToStoreProps(settings[0]));
    };

    fetchPomodoro();
  }, []);

  return (
    <PomodoroContext.Provider value={pomodoroStore}>
      {children}
    </PomodoroContext.Provider>
  );
}
