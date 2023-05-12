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
      <div className="rounded-lg border-[1px] border-cl-neutral-200">
        <div className="flex flex-col p-3">
          <input
            {...register("section_name", { required: true })}
            className="mb-2 text-sm font-semibold outline-none"
            type="text"
            placeholder="Section name"
          />
        </div>
        <div className="flex justify-between border-t-[1px] border-cl-neutral-200 p-2">
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
