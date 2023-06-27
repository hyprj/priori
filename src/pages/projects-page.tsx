import { Container } from "@components/container/Container";
import { AddProject } from "@features/addProject/AddProject";
import { useAuth } from "@features/auth/AuthProvider";
import { Page } from "@layouts/Page/Page";
import { getProjects } from "@services/db";
import { queryClient } from "@src/main";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IProject } from "src/types/types";

export function ProjectsPage() {
  const { user } = useAuth();
  const { data: projects } = useQuery<IProject[]>(
    "projects",
    () => getProjects(user?.id!),
    {
      onSuccess: (data) => {
        data.forEach((project) => {
          queryClient.setQueryData(["project", project.id], project);
        });
      },
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
            {projects.length === 0 && (
              <p className="mb-6">
                Seems like you don't have any projects yet.
              </p>
            )}
            {projects.map((project) => (
              <Link key={project.id} to={`/app/projects/${project.id}`}>
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
          <AddProject buttonContent="Add project" />
        </div>
      </Container>
    </Page>
  );
}
