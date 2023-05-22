import { useContext } from "react";
import { useStore } from "zustand";
import { PomodoroState } from "../store";
import { PomodoroContext } from "../provider/PomodoroProvider";

export function usePomodoroContext<T>(
  selector: (state: PomodoroState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(PomodoroContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector, equalityFn);
}
