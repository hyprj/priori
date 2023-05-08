export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface ITask {
  name: string;
  order: number;
  id: string;
  note?: string;
  priority?: Priority;
}

export interface ISection {
  name: string;
  id: string;
  order: number;
  tasks: ITask[];
}

export interface IProject {
  display: "list" | "board";
  id: string;
  name: string;
  sections: ISection[];
}
