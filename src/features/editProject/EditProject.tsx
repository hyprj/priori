import { Button } from "@components/button/Button";
import { Modal } from "@components/modal/Modal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { IProject } from "src/types/types";
import { EditProjectForm } from "./EditProjectForm";

export function EditProject({ project }: { project: IProject }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Modal show={isActive} onClose={() => setIsActive(false)}>
        <EditProjectForm onClose={() => setIsActive(false)} project={project} />
      </Modal>
      <Button
        onClick={() => setIsActive((prev) => !prev)}
        className="hover:text-green-800"
      >
        <PencilSquareIcon className="h-6" />
      </Button>
    </>
  );
}
