import { IProject } from "src/types/types";
import { supabase } from "./auth";

export async function getProjects(userId: string): Promise<IProject[]> {
  const { data, error } = await supabase
    .from("project")
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
    .from("project")
    .select("*, sections(*, tasks(*))")
    .match({ user_id: userId, id: projectId });

  console.log(data, error);

  if (error) {
    throw new Error(error.message);
  }
  return data as IProject[];
}
