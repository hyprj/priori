import { Button } from "@components/button/Button";
import { useSidebarContext } from "@components/sidebar/SidebarProvider";
import { useUser } from "@features/auth/useUser";
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
import { login, signOut } from "@services/db";
import { ToggleThemeButton } from "@features/theme/ToggleThemeButton";
import { ThemeButton } from "@components/themeButton/ThemeButton";

export function Header() {
  const { toggle } = useSidebarContext();
  const navigate = useNavigate();
  const user = useUser();

  const { pathname } = useLocation();

  const onSignOut = () => {
    signOut();
    queryClient.setQueryData("user", null);
    navigate("/");
  };

  const onSignIn = async () => {
    try {
      await login();
    } catch (error) {
      console.warn("Could not sign in");
    }
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
            <div className="rounded-md p-1 hover:bg-gray-200">
              <Menu.Button>
                {user ? (
                  <img
                    className="inline-block h-6 rounded-full"
                    src={user?.avatar_url}
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
                <Menu.Item>
                  <>
                    {user ? (
                      <Button onClick={onSignOut}>Sign Out</Button>
                    ) : (
                      <Button onClick={onSignIn}>Sign In</Button>
                    )}
                  </>
                </Menu.Item>
                <Menu.Item>
                  <>
                    {/* <ToggleThemeButton /> */}
                    <ThemeButton />
                  </>
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
