import { Priority } from "./types";

export interface DBProject {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
}

export interface DBSection {
  id: string;
  name: string;
  order: number;
  project_id: string;
  created_at: string;
}

export interface DBTask {
  id: string;
  name: string;
  order: number;
  section_id: string;
  note: string | null;
  priority: Priority;
  created_at: string;
}

export interface DBPersonalTask {
  user_id: string;
  id: string;
  name: string;
  note: string | null;
  priority: Priority;
  created_at: string;
}
