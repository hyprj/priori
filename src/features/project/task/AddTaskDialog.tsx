import { Button } from "@components/button/Button";
import { useForm } from "react-hook-form";
import { AddTaskInputs } from "../sections/SectionFooter";
import { FormContainer } from "@components/formContainer/FormContainer";

export function AddTaskDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: AddTaskInputs) => void;
}) {
  const { register, handleSubmit, formState } = useForm<AddTaskInputs>();
  const isDisabled = !formState.isValid;

  return (
    <FormContainer onClose={onClose} hasOverlay>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-lg border-[1px] dark:border-white/10">
          <div className="flex flex-col p-3">
            <input
              {...register("name", { required: true })}
              className="mb-2 text-sm font-semibold outline-none"
              type="text"
              placeholder="Task name"
            />
            <textarea
              {...register("note")}
              className="mb-1 w-full resize-y text-xs text-gray-600 outline-none"
              placeholder="Note"
            />
          </div>
          <div className="flex justify-between border-t-[1px] p-2 dark:border-white/10">
            <div className="">
              <p className="text-sm font-semibold">priority</p>
              <select className="dark:bg-slate-700" {...register("priority")}>
                <option defaultChecked value={1}>
                  low
                </option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="action" type="submit" disabled={isDisabled}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormContainer>
  );
}
