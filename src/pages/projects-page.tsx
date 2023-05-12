import { Container } from "@components/container/Container";
import { useUser } from "@features/auth/useUser";
import { Page } from "@layouts/Page/Page";
import { getProjects } from "@services/db";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IProject } from "src/types/types";

export function ProjectsPage() {
  const user = useUser();
  const { data: projects } = useQuery<IProject[]>(
    "projects",
    () => getProjects(user?.id!),
    {
      suspense: true,
    }
  );

  if (!projects) {
    return null;
  }

  return (
    <Page>
      <Container>
        <div className="my-16">
          <h3 className="text-3xl font-semibold">Projects</h3>
          <section className="mt-8">
            {projects.map((project) => (
              <Link to={`/app/projects/${project.id}`}>
                <div className="my-4 rounded-lg p-2 hover:bg-neutral-100 hover:dark:bg-white/10">
                  <h4 className="text-xl font-semibold">{project.name}</h4>
                  <p>
                    {`${project.sections.reduce(
                      (acc, proj) => acc + proj.tasks.length,
                      0
                    )} tasks`}
                  </p>
                </div>
              </Link>
            ))}
          </section>
          {/* TODO: add new project dialog */}
          <div>add new project</div>
        </div>
      </Container>
    </Page>
  );
}
