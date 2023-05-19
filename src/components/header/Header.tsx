import { Button } from "@components/button/Button";
import { useSidebarContext } from "@components/sidebar/SidebarProvider";
import { Menu, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { queryClient } from "../../main";
import { signOut } from "@services/db";
import { ThemeButton } from "@components/themeButton/ThemeButton";
import { useAuth } from "@features/auth/AuthProvider";

export function Header() {
  const { toggle } = useSidebarContext();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { pathname } = useLocation();

  const onSignOut = () => {
    signOut();
    queryClient.setQueryData("user", null);
    navigate("/");
  };

  return (
    <>
      <header className="text-primary sticky top-0 z-40  w-full ">
        <div className="flex items-center  justify-between bg-neutral-100 px-4 py-1 dark:bg-slate-700 ">
          <div className="flex items-center gap-4 ">
            {user && (
              <>
                <button onClick={toggle}>
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <Link to="/app">
                  <HomeIcon className="h-6 w-6" />
                </Link>
              </>
            )}
          </div>
          <h1 className="hidden font-abhaya text-2xl font-bold lg:block">
            Priori
          </h1>
          <Menu as="div" className="relative">
            <div className="rounded-md p-1 hover:bg-gray-200 dark:hover:bg-slate-600">
              <Menu.Button>
                {user ? (
                  <img
                    className="inline-block h-6 rounded-full"
                    src={(user as any).avatar_url}
                  />
                ) : (
                  <UserCircleIcon className="inline-block h-6 w-6" />
                )}

                <ChevronDownIcon className="inline-block h-6 w-6 " />
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
              <Menu.Items className="absolute right-0 flex min-w-[8rem] flex-col gap-1 rounded-lg bg-white p-1 shadow  dark:bg-slate-800">
                {user ? (
                  <Menu.Item>
                    <>
                      <Button onClick={onSignOut}>Sign Out</Button>
                    </>
                  </Menu.Item>
                ) : (
                  <>
                    <Menu.Item>
                      <>
                        <Button onClick={() => navigate("/login")}>
                          Log In
                        </Button>
                      </>
                    </Menu.Item>
                    <Menu.Item>
                      <>
                        <Button onClick={() => navigate("/register")}>
                          Sign Up
                        </Button>
                      </>
                    </Menu.Item>
                  </>
                )}
                <Menu.Item>
                  <div className="mt-4 w-full">
                    <ThemeButton />
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {pathname === "/" && user && (
          <Link
            to="/app"
            className=" inline-block w-full bg-blue-400 p-1 text-center text-white"
          >
            You are signed in. Click to go to app
          </Link>
        )}
      </header>
    </>
  );
}
