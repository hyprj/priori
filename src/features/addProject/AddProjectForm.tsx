import { Button } from "@components/button/Button";
import { useForm } from "react-hook-form";
import { queryClient } from "../../main";
import { IProject } from "../../types/types";
import { createProject } from "@services/db";
import { TextInput } from "@components/textInput/TextInput";
import { useAuth } from "@features/auth/AuthProvider";

interface Inputs {
  projectName: string;
}

export function AddProjectForm({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, formState, setError } = useForm<Inputs>();

  const { user } = useAuth();
  const userId = user?.id;

  const namesInUse =
    queryClient
      .getQueryData<IProject[]>("projects")
      ?.map((project) => project.name) || [];

  async function onSubmit(data: Inputs) {
    if (!userId) return;
    if (namesInUse.includes(data.projectName)) {
      setError("projectName", {
        type: "custom",
        message: "This name is already in use",
      });
      return;
    }

    try {
      await createProject(userId, data.projectName);
      queryClient.refetchQueries();
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        error={formState.errors.projectName}
        id="projectName"
        label="Project name"
        register={register}
        name="projectName"
        validationSchema={{ required: true, minLength: 3 }}
      />
      <div>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="action" disabled={!formState.isValid}>
          Add project
        </Button>
      </div>
    </form>
  );
}
