import { Overlay } from "@components/overlay/Overlay";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createTask } from "@services/db";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Priority, ITask } from "src/types/types";
import { AddTaskDialog } from "./AddTaskDialog";
import { Button } from "@components/button/Button";

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
    setIsActive(false);
  };

  const handleEscape = (e: KeyboardEvent) =>
    e.key === "Escape" && setIsActive(false);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isActive]);

  return (
    <footer>
      {!isActive && (
        <Button variant="white" size="xxs">
          <PlusIcon
            className="h-6"
            strokeWidth={0.5}
            onClick={() => setIsActive(true)}
          />
        </Button>
      )}
      {isActive && (
        <>
          <Overlay onClick={() => setIsActive(false)} />
          <div className="relative z-30">
            <AddTaskDialog
              onSubmit={handleSubmit}
              onClose={() => setIsActive(false)}
            />
          </div>
        </>
      )}
    </footer>
  );
}
