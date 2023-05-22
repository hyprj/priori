import { StateCreator } from "zustand";
import { PomodoroState } from ".";
import { DBPomodoro } from "src/types/dbTypes";
import { updatePomodoro } from "@services/db";
export interface DbProps {
  pomodoro_id: string | null;
}

const DEFAULT_DB_PROPS: DbProps = {
  pomodoro_id: null,
};

export interface DbSlice extends DbProps {
  updatePomodoro: (data: Partial<DBPomodoro>) => void;
}
export const createDbSlice: StateCreator<PomodoroState, [], [], DbSlice> = (
  _,
  get
) => ({
  ...DEFAULT_DB_PROPS,
  updatePomodoro: (data) => {
    const { pomodoro_id } = get();
    if (pomodoro_id) {
      updatePomodoro({ ...data, id: pomodoro_id });
    }
  },
});
