import { FieldError } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  ...rest
}: TextInputProps) {
  const { className, ...props } = rest;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        {...props}
        {...register(name, validationSchema)}
        className={`block ${className} rounded-md border-2 dark:border-slate-500`}
        id={id}
      />
      <div className="mt-1 h-6 text-xs text-red-500">{error?.message}</div>
    </div>
  );
}
