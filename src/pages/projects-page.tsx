import { Page } from "@layouts/Page/Page";
import { getProjects } from "@services/api";
import { useQuery } from "react-query";
import { IProject } from "src/types/types";

export function ProjectsPage() {
  const {} = useQuery<IProject[]>("projects", getProjects, {
    suspense: true,
  });
  return <Page>t</Page>;
}
