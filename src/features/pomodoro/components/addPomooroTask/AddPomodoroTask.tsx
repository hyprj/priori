import { FormContainer } from "@components/formContainer/FormContainer";
import { useState } from "react";
import { PomodoroTaskForm } from "../pomodoroTaskForm/PomodoroTaskForm";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@components/button/Button";

export function AddPomodoroTask() {
  const [isActive, setIsActive] = useState(true);

  return isActive ? (
    <FormContainer hasOverlay={true} onClose={() => setIsActive(false)}>
      <PomodoroTaskForm />
    </FormContainer>
  ) : (
    <Button size="xxs" className="mt-8" onClick={() => setIsActive(true)}>
      <PlusIcon className="h-6" />
    </Button>
  );
}
