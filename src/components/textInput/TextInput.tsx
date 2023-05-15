import { FieldError } from "react-hook-form";

interface TextInputProps {
  label: string;
  id: string;
  register: any;
  error: FieldError | undefined;
  name: string;
  validationSchema: any;
}

export function TextInput({
  label,
  id,
  register,
  error,
  name,
  validationSchema,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        {...register(name, validationSchema)}
        className="block rounded-md border-2"
        id={id}
      />
      <div className="mt-1 h-6 text-xs text-red-500">{error?.message}</div>
    </div>
  );
}
