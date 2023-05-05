export interface ITask {
  name: string;
  order: number;
  id: string;
  note?: string;
  priority?: 1 | 2 | 3;
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
