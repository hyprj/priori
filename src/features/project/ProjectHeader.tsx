import { Button } from "@components/button/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteProject } from "@services/db";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../main";
import { IProject } from "src/types/types";
import { EditProject } from "@features/editProject/EditProject";

export function ProjectHeader({ project }: { project: IProject }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      queryClient.removeQueries(["project", project.id]);
      navigate("/app");
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <header className="flex justify-between">
      <h3 className="text-3xl font-semibold">{project.name}</h3>
      <div className="flex gap-2">
        <EditProject project={project} />
        <Button className="hover:text-red-700" onClick={handleDelete}>
          <TrashIcon className="h-6" />
        </Button>
      </div>
    </header>
  );
}
