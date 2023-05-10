import { Button } from "@components/button/Button";
import { useForm } from "react-hook-form";
import { AddTaskInputs } from "./SectionFooter";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-[1px] rounded-lg">
        <div className="flex p-3 flex-col">
          <input
            {...register("name", { required: true })}
            className="outline-none mb-2 font-semibold text-sm"
            type="text"
            placeholder="Task name"
          />
          <textarea
            {...register("note")}
            className="text-xs outline-none mb-1 w-full text-gray-600 resize-y"
            placeholder="Note"
          />
        </div>
        <div className="p-2 border-t-[1px] flex justify-between">
          <div className="">
            <p className="text-sm font-semibold">priority</p>
            <select {...register("priority")}>
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
  );
}
