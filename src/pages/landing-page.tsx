import { Button } from "@components/button/Button";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <main>
      <header className="flex bg-neutral-100 sticky top-0  w-full justify-between items-center px-4 py-2 ">
        <div />
        <h1 className="text-2xl font-abhaya font-bold hidden lg:block">
          Priori
        </h1>
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
      <section className="py-32 flex flex-col items-center text-center bg-gradient-to-b from-[#e2c2ff] to-[#ffc3e1]">
        <h2 className="text-3xl md:text-5xl leading-snug font-bold mb-8">
          Organize your tasks, stay focused,
          <br /> achieve your goals.
        </h2>
        <p className="text-xl max-w-md">
          Get more done with{" "}
          <b>
            <i>Priori</i>
          </b>
          , the ultimate productivity app.
        </p>
        <div className="mt-8">
          <Button variant="action" size="lg">
            Start using for free
          </Button>
        </div>
        <div className="mt-20">
          <p>See more</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.3}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
            />
          </svg>
        </div>
      </section>
      <section className="py-8 pb-40 text-center bg-[#fff7d6]">
        <div className="mb-8">
          <p>Welcome</p>
        </div>
        <Button variant="success" size="lg">
          <Link to="/app">Start working as a guest</Link>
        </Button>
      </section>
    </main>
  );
}
