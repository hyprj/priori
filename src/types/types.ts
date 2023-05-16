export type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>;

export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export const PRORITIES = [1, 2, 3] as const;

export type Priority = (typeof PRORITIES)[number];

export type PriorityText = "low" | "medium" | "high";

export const priorityText: { [K in Priority]: PriorityText } = {
  1: "low",
  2: "medium",
  3: "high",
};

export interface ITask {
  name: string;
  order: number;
  id: string;
  section_id: string;
  note: string | null;
  priority?: Priority;
}

export interface ISection {
  name: string;
  id: string;
  order: number;
  tasks: ITask[];
  project_id: string;
}

export type NewISection = Omit<ISection, "id" | "tasks">;

export interface IProject {
  id: string;
  name: string;
  sections: ISection[];
}

export type NewIProject = Omit<IProject, "id" | "tasks">;
