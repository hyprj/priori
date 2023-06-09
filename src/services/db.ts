import { IProject, ISection, PartialExcept } from "src/types/types";
import { createClient } from "@supabase/supabase-js";
import { Database } from "src/types/supabase";
import { ITask } from "src/types/types";
import { DBPersonalTask, DBPomodoro, DBSection } from "src/types/dbTypes";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "https://hyprj-priori.netlify.app/app/",
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log(email, password, error);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signOut = () => supabase.auth.signOut();

export async function getPersonalTasks(
  userId: string
): Promise<DBPersonalTask[]> {
  const { data, error } = await supabase
    .from("personal_task")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
  return data as DBPersonalTask[];
}

export async function createPersonalTask(
  task: Omit<DBPersonalTask, "id" | "created_at">
) {
  const { data, error } = await supabase.from("personal_task").insert([task]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deletePersonalTask(taskId: string) {
  const { error } = await supabase
    .from("personal_task")
    .delete()
    .match({ id: taskId });

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("tasks").delete().match({ id: taskId });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getProjects(userId: string): Promise<IProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*, sections(*, tasks(*))")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
  return data as IProject[];
}

export async function getProject(
  userId: string,
  projectId: string
): Promise<IProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*, sections(*, tasks(*))")
    .match({ user_id: userId, id: projectId });

  if (error) {
    throw new Error(error.message);
  }
  return data as IProject[];
}

export async function createProject(userId: string, projectName: string) {
  const { error } = await supabase
    .from("projects")
    .insert([{ user_id: userId, name: projectName }]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateProject(
  projectFields: Partial<IProject> & { id: string }
) {
  const { error } = await supabase
    .from("projects")
    .update(projectFields)
    .match({ id: projectFields.id });

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .match({ id: projectId });
  if (error) {
    throw new Error(error.message);
  }
}

export async function createTask(task: Omit<ITask, "id">) {
  const { data, error } = await supabase.from("tasks").insert([task]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateTask(task: ITask) {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .match({ id: task.id });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createSection(section: Omit<ISection, "id" | "tasks">) {
  const { data, error } = await supabase.from("sections").insert([section]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateSection(
  sectionFields: PartialExcept<DBSection, "id">
) {
  const { error } = await supabase
    .from("sections")
    .update(sectionFields)
    .match({ id: sectionFields.id });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getPomodoro(userId: string) {
  const { data, error } = await supabase
    .from("pomodoro")
    .select("*")
    .match({ user_id: userId });

  if (error) {
    throw new Error(error.message);
  }
  return data as DBPomodoro[];
}

export async function updatePomodoro(
  pomodoroFields: PartialExcept<DBPomodoro, "id">
) {
  const { error } = await supabase
    .from("pomodoro")
    .update(pomodoroFields)
    .match({ id: pomodoroFields.id });

  if (error) {
    throw new Error(error.message);
  }
}
