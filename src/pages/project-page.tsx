import { useUser } from "@features/auth/useUser";
import { Project } from "@features/project/Project";
import { Page } from "@layouts/Page/Page";
import { getProject } from "@services/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function ProjectPage() {
  const user = useUser();

  if (!user?.id) {
    return null;
  }
  const { id: projectId } = useParams<{ id: string }>();

  if (!projectId) return null;

  const { data: project } = useQuery(
    "project",
    () => getProject(user.id, projectId),
    { suspense: true }
  );

  if (!project) {
    return <p>error</p>;
  }

  return (
    <Page>
      <Project project={project[0]} />
    </Page>
  );
}
