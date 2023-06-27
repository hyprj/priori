import { DBPersonalTask } from "@src/types/dbTypes";

const DAY_INDEX_ISO_STRING_START = 9;

export function getDayFromISOStringDate(isoDate: string): number {
  return Number(isoDate.slice(DAY_INDEX_ISO_STRING_START, 12));
}

export function categorizeTasksByDate(tasks: DBPersonalTask[]): {
  todayTasks: DBPersonalTask[];
  overdueTasks: DBPersonalTask[];
} {
  const todayTasks = [];
  const overdueTasks = [];

  const dayOfMonth = new Date().getDate() + 1;

  for (const task of tasks) {
    if (getDayFromISOStringDate(task.created_at) === dayOfMonth) {
      todayTasks.push(task);
    } else {
      overdueTasks.push(task);
    }
  }

  return { todayTasks, overdueTasks };
}
