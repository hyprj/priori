import { Button } from "@components/button/Button";
import { TextInput } from "@components/textInput/TextInput";
import { Switch } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { SettingsProps } from "./store/settingsSlice";

export interface PomodoroSettingsFormProps {
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  autoStartBreak: boolean;
  autoStartPomodoro: boolean;
}

export function PomodoroSettingsForm({
  formData,
  onClose,
  onSubmit,
}: {
  formData: SettingsProps;
  onClose: () => void;
  onSubmit: (data: PomodoroSettingsFormProps) => void;
}) {
  const { register, handleSubmit, formState, control } =
    useForm<PomodoroSettingsFormProps>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 flex gap-4">
        <TextInput
          type="number"
          label="pomodoro (s)"
          id="pomodoro-length"
          defaultValue={formData.length.pomodoro}
          error={formState.errors.pomodoroLength}
          name="pomodoroLength"
          min={1}
          max={3600}
          register={register}
          validationSchema={{ required: true, min: 1, max: 3600 }}
        />
        <TextInput
          type="number"
          label="short break (s)"
          id="shortbreak-length"
          defaultValue={formData.length["short-break"]}
          error={formState.errors.shortBreakLength}
          name="shortBreakLength"
          min={1}
          max={3600}
          register={register}
          validationSchema={{ required: true, min: 1, max: 3600 }}
        />
        <TextInput
          type="number"
          label="long break (s)"
          id="longbreak-length"
          defaultValue={formData.length["long-break"]}
          error={formState.errors.longBreakLength}
          name="longBreakLength"
          min={1}
          max={3600}
          register={register}
          validationSchema={{ required: true, min: 1, max: 3600 }}
        />
      </div>
      <div className="my-4 flex items-center justify-between">
        <p>Auto start breaks</p>
        <Controller
          control={control}
          name="autoStartBreak"
          defaultValue={formData.autoStartBreak}
          render={({ field: { onChange } }) => (
            <Switch
              defaultChecked={formData.autoStartBreak}
              onChange={onChange}
              className={({ checked }) => `${
                checked ? "bg-teal-900" : "bg-neutral-300"
              }
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              {({ checked }) => (
                <>
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${checked ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </>
              )}
            </Switch>
          )}
        ></Controller>
      </div>
      <div className="my-4 flex items-center justify-between">
        <p>Auto start pomodoros</p>
        <Controller
          control={control}
          name="autoStartPomodoro"
          defaultValue={formData.autoStartPomodoro}
          render={({ field: { onChange } }) => (
            <Switch
              onChange={onChange}
              defaultChecked={formData.autoStartPomodoro}
              name="autoStartPomodoro"
              className={({ checked }) => `${
                checked ? "bg-teal-900" : "bg-neutral-300"
              }
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              {({ checked }) => (
                <>
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${checked ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </>
              )}
            </Switch>
          )}
        ></Controller>
      </div>
      <div className="mt-16 flex justify-end gap-2">
        <Button variant="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="action">Apply</Button>
      </div>
    </form>
  );
}
