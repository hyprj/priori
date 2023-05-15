import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { PRORITIES, Priority, priorityText } from "../../types/types";

export function PriorityListbox({
  handleClick,
  selected,
}: {
  handleClick: (priority: Priority) => void;
  selected: Priority;
}) {
  const [priorityValue, setPriorityValue] = useState(selected);

  const handleChange = (priority: Priority) => {
    console.log(priority);
    setPriorityValue(priority);
    handleClick(priority);
  };

  return (
    <div>
      <Listbox value={priorityValue} onChange={handleChange}>
        <div className="relative w-14">
          <div className="flex flex-col items-center">
            <Listbox.Label className="w-full text-center text-xs font-semibold">
              Priority
            </Listbox.Label>
            <Listbox.Button className="w-full rounded bg-neutral-100 px-1 py-[1px] text-xs">
              {priorityText[priorityValue]}
            </Listbox.Button>
          </div>
          <Listbox.Options>
            <div className="absolute -right-4 z-30 mt-2 overflow-hidden rounded-lg bg-white shadow dark:bg-slate-700">
              {PRORITIES.map((priority) => (
                <Listbox.Option
                  key={priority}
                  value={priority}
                  className={({ active }) =>
                    `px-2  text-sm  ${active ? "bg-neutral-100" : ""}`
                  }
                >
                  {priorityText[priority]}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
