import { useState } from "react";
import { AddSectionDialog, AddSectionInputs } from "./AddSectionDialog";
import { Transition } from "@headlessui/react";

export function AddSection() {
  const [isOpen, setIsOpen] = useState(false);
  const onAddSection = ({ section_name }: AddSectionInputs) => {
    console.log(section_name);
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
          className="flex transition-opacity hover:cursor-pointer  items-center mx-auto justify-center w-[80%] gap-4 opacity-0 text-red-600/70 py-2 hover:opacity-100"
          onClick={() => setIsOpen(true)}
        >
          <div className="h-[1.5px] rounded bg-red-600/70 grow"></div>
          <div className="font-semibold">Add section</div>
          <div className="h-[1.5px] rounded bg-red-600/70 grow"></div>
        </div>
      )}
    </>
  );
}
