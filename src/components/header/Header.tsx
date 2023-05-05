import { useSidebarContext } from "@components/sidebar/SidebarProvider";
import { Menu, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

export function Header() {
  const { toggle } = useSidebarContext();

  return (
    <header className="flex bg-neutral-100 sticky w-full justify-between items-center px-4 py-2 ">
      <button className="">
        <Bars3Icon className="h-6 w-6" onClick={toggle} />
      </button>
      <h1 className="text-2xl font-abhaya font-bold hidden lg:block">Priori</h1>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button>
            <UserCircleIcon className="w-6 h-6 inline-block" />
            <ChevronDownIcon className="w-6 h-6 inline-block " />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0">
            <Menu.Item>{() => <div>active</div>}</Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
}
