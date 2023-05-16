import { Button } from "@components/button/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IProject } from "src/types/types";

export function ProjectHeader({ project }: { project: IProject }) {
  return (
    <header className="flex justify-between">
      <h3 className="text-3xl font-semibold">{project.name}</h3>
      <div className="flex gap-2">
        <Button className="hover:text-green-800">
          <PencilSquareIcon className="h-6" />
        </Button>
        <Button className="hover:text-red-700">
          <TrashIcon className="h-6" />
        </Button>
      </div>
    </header>
  );
}
