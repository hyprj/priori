import { Button } from "@components/button/Button";
import { useForm } from "react-hook-form";

export interface AddSectionInputs {
  section_name: string;
}

export function AddSectionDialog({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: AddSectionInputs) => void;
}) {
  const { register, handleSubmit, formState } = useForm<AddSectionInputs>();
  const isDisabled = !formState.isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-[1px] rounded-lg">
        <div className="flex p-3 flex-col">
          <input
            {...register("section_name", { required: true })}
            className="outline-none mb-2 font-semibold text-sm"
            type="text"
            placeholder="Section name"
          />
        </div>
        <div className="p-2 border-t-[1px] flex justify-between">
          <div className="flex gap-2">
            <Button onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="action" disabled={isDisabled}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
``;
