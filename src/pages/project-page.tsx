import { Container } from "@components/container/Container";
import { useAuth } from "@features/auth/AuthProvider";
import { Project } from "@features/project/Project";
import { Page } from "@layouts/Page/Page";
import { getProject } from "@services/db";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function ProjectPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const { user } = useAuth();

  if (!user?.id || !projectId) {
    return null;
  }

  const { data: project } = useQuery(["project", projectId], () =>
    getProject(user.id, projectId)
  );

  if (!project) {
    return null;
  }

  return (
    <Page>
      <Container>
        <Project project={project[0]} />
      </Container>
    </Page>
  );
}
