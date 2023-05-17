import { PlusIcon } from "@heroicons/react/24/outline";
import { createPersonalTask } from "@services/db";
import { useState } from "react";
import { useMutation } from "react-query";
import { Priority } from "src/types/types";
import { FormContainer } from "@components/formContainer/FormContainer";
import { DBPersonalTask } from "src/types/dbTypes";
import { queryClient } from "../../main";
import { Button } from "@components/button/Button";
import { AddTaskDialog } from "@features/project/task/AddTaskDialog";

interface AddTaskInputs {
  name: string;
  note?: string;
  priority: Priority;
}

export function PersonalTasksFooter({ userId }: { userId: string }) {
  const [isActive, setIsActive] = useState(false);
  const { mutateAsync } = useMutation(
    (task: Omit<DBPersonalTask, "id" | "created_at">) =>
      createPersonalTask(task)
  );

  const handleSubmit = async (data: AddTaskInputs) => {
    const task: Omit<DBPersonalTask, "id" | "created_at"> = {
      user_id: userId,
      name: data.name,
      note: data.note || null,
      priority: data.priority,
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
        <FormContainer hasOverlay onClose={() => setIsActive(false)}>
          <AddTaskDialog
            onSubmit={handleSubmit}
            onClose={() => setIsActive(false)}
          />
        </FormContainer>
      )}
    </footer>
  );
}
