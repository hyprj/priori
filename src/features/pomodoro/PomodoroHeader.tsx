import { Button } from "@components/button/Button";
import { Modal } from "@components/modal/Modal";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  PomodoroSettingsForm,
  PomodoroSettingsFormProps,
} from "./PomodoroSettingsForm";
import { usePomodoroContext } from "./hooks/usePomodoroContext";

export function PomodoroHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { length, autoStartBreak, autoStartPomodoro, updateSettings } =
    usePomodoroContext((state) => state);

  return (
    <>
      <Modal
        title="Edit Pomodoro settings"
        show={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      >
        <PomodoroSettingsForm
          formData={{
            length,
            autoStartBreak,
            autoStartPomodoro,
          }}
          onSubmit={(data: PomodoroSettingsFormProps) => {
            setIsSettingsOpen(false);
            updateSettings({
              length: {
                "long-break": Number(data.longBreakLength),
                "short-break": Number(data.shortBreakLength),
                pomodoro: Number(data.pomodoroLength),
              },
              autoStartBreak: data.autoStartBreak,
              autoStartPomodoro: data.autoStartPomodoro,
            });
          }}
          onClose={() => setIsSettingsOpen(false)}
        />
      </Modal>
      <div className="mb-4 flex justify-between">
        <h3 className="font-abhaya text-3xl font-semibold">Pomodoro</h3>
        <Button size="xxs" onClick={() => setIsSettingsOpen(true)}>
          <Cog8ToothIcon className="h-5" />
        </Button>
      </div>
    </>
  );
}
