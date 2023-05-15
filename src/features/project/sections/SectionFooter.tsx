import { PlusIcon } from "@heroicons/react/24/outline";
import { createTask } from "@services/db";
import { useState } from "react";
import { useMutation } from "react-query";
import { Priority, ITask } from "src/types/types";
import { AddTaskDialog } from "../task/AddTaskDialog";
import { Button } from "@components/button/Button";
import { queryClient } from "../../../main";
import { FormContainer } from "@components/formContainer/FormContainer";

export interface AddTaskInputs {
  name: string;
  note?: string;
  priority: Priority;
}

export function SectionFooter({ sectionId }: { sectionId: string }) {
  const [isActive, setIsActive] = useState(false);
  const { mutateAsync } = useMutation((task: Omit<ITask, "id">) =>
    createTask(task)
  );

  const handleSubmit = async (data: AddTaskInputs) => {
    const task: Omit<ITask, "id"> = {
      name: data.name,
      note: data.note || null,
      priority: data.priority,
      section_id: sectionId,
      order: 0,
    };
    await mutateAsync(task);
    queryClient.refetchQueries();
    setIsActive(false);
  };

  return (
    <footer>
      {!isActive && (
        <Button variant="primary" size="xxs">
          <PlusIcon
            className="h-6"
            strokeWidth={0.5}
            onClick={() => setIsActive(true)}
          />
        </Button>
      )}
      {isActive && (
        <FormContainer
          hasOverlay
          onClose={() => setIsActive(false)}
          form={
            <AddTaskDialog
              onSubmit={handleSubmit}
              onClose={() => setIsActive(false)}
            />
          }
        />
      )}
    </footer>
  );
}
