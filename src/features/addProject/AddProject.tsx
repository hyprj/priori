import { Button } from "@components/button/Button";
import { useState } from "react";
import { AddProjectDialog } from "./AddProjectDialog";

export function AddProject({
  buttonContent,
}: {
  buttonContent: string | React.ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Button onClick={() => setIsActive(true)}>{buttonContent}</Button>
      <AddProjectDialog isActive={isActive} setIsActive={setIsActive} />
    </>
  );
}
