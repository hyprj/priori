import { Button } from "@components/button/Button";
import { useForm } from "react-hook-form";
import { queryClient } from "../../main";
import { TextInput } from "@components/textInput/TextInput";
import { IProject } from "src/types/types";
import { updateProject } from "@services/db";
import { useAuth } from "@features/auth/AuthProvider";

interface Inputs {
  projectName: string;
}

export function EditProjectForm({
  onClose,
  project,
}: {
  onClose: () => void;
  project: IProject;
}) {
  const { register, handleSubmit, formState, setError } = useForm<Inputs>({
    defaultValues: { projectName: project.name },
  });

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
      await updateProject({ id: project.id, name: data.projectName });
      queryClient.refetchQueries(["project"]);
      // queryClient.refetchQueries("projects");
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
