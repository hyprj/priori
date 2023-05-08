import { Project } from "@features/project/Project";
import { Page } from "@layouts/Page/Page";
import { getProject } from "@services/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IProject } from "src/types/types";

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useQuery<IProject>(
    ["projects", id],
    () => getProject(id as string),
    {
      suspense: true,
    }
  );

  if (!project) {
    return <p>error</p>;
  }

  return (
    <Page>
      <Project project={project} />
    </Page>
  );
}
