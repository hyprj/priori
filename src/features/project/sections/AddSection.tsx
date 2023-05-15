import { useState } from "react";
import { AddSectionDialog, AddSectionInputs } from "./AddSectionDialog";
import { Transition } from "@headlessui/react";
import { useMutation } from "react-query";
import { createSection } from "@services/db";
import { queryClient } from "../../../main";

export function AddSection({
  projectId,
  order,
}: {
  projectId: string;
  order: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation((name: string) =>
    createSection({ name, project_id: projectId, order })
  );
  const onAddSection = async ({ section_name }: AddSectionInputs) => {
    await mutateAsync(section_name);
    queryClient.refetchQueries();
    setIsOpen(false);
  };
  return (
    <>
      <Transition
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={isOpen}
      >
        <AddSectionDialog
          onClose={() => setIsOpen(false)}
          onSubmit={onAddSection}
        />
      </Transition>
      {!isOpen && (
        <div
          className="mx-auto flex w-[80%]  items-center justify-center gap-4 py-2 text-red-600/70 opacity-0 transition-opacity hover:cursor-pointer hover:opacity-100 dark:text-red-400"
          onClick={() => setIsOpen(true)}
        >
          <div className="h-[1.5px] grow rounded bg-red-600/70 dark:bg-red-400"></div>
          <div className="font-semibold">Add section</div>
          <div className="h-[1.5px] grow rounded bg-red-600/70 dark:bg-red-400"></div>
        </div>
      )}
    </>
  );
}
