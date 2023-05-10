import { useUser } from "@features/auth/useUser";
import { Page } from "@layouts/Page/Page";
import { getProjects } from "@services/db";
import { useQuery } from "react-query";
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

  console.log(projects);

  return (
    <Page>
      <div>
        <div></div>
        <section>
          {projects.map((project) => (
            <div>
              <h3>{project.name}</h3>
              <p>
                {`tasks: ${project.sections.reduce(
                  (acc, proj) => acc + proj.tasks.length,
                  0
                )}`}
              </p>
            </div>
          ))}
        </section>
      </div>
    </Page>
  );
}
