import { useUser } from "@features/auth/useUser";
import { Page } from "@layouts/Page/Page";
import { getProjects } from "@services/db";
import { useQuery } from "react-query";
import { IProject } from "src/types/types";

export function ProjectsPage() {
  const user = useUser();
  const {} = useQuery<IProject[]>("projects", () => getProjects(user?.id!), {
    suspense: true,
  });
  return <Page>t</Page>;
}
