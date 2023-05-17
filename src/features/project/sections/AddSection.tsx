import { useState } from "react";
import { AddSectionDialog, AddSectionInputs } from "./AddSectionDialog";
import { Transition } from "@headlessui/react";
import { useMutation } from "react-query";
import { createSection, updateSection } from "@services/db";
import { queryClient } from "../../../main";
import { ISection, NewISection } from "src/types/types";
import { updateOrdersFromOrder } from "../utils/utils";

async function handleAddSection(sections: {
  updated: ISection[];
  new: NewISection;
}) {
  await Promise.all([
    createSection(sections.new),
    ...sections.updated.map((updated) =>
      updateSection({ order: updated.order, id: updated.id })
    ),
  ]);
}

export function AddSection({
  projectId,
  sectionOrder,
  sections,
}: {
  projectId: string;
  sectionOrder: number;
  sections: ISection[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(handleAddSection);
  const onAddSection = async ({ section_name }: AddSectionInputs) => {
    const updatedSections = updateOrdersFromOrder(sections, sectionOrder);
    const newSection: NewISection = {
      name: section_name,
      project_id: projectId,
      order: sectionOrder,
    };
    await mutateAsync({ new: newSection, updated: updatedSections });
    queryClient.refetchQueries(["project", projectId]);
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
