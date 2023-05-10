// export enum Priority {
//   Low = "low",
//   Medium = "medium",
//   High = "high",
// }
export type Priority = 1 | 2 | 3;

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

export interface IProject {
  display: "list" | "board";
  id: string;
  name: string;
  sections: ISection[];
}
