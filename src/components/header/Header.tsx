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
      <header className="sticky top-0 z-40  w-full ">
        <div className="  flex bg-neutral-100  justify-between items-center px-4 py-1 ">
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
          <h1 className="text-2xl font-abhaya font-bold hidden lg:block">
            Priori
          </h1>
          <Menu as="div" className="relative">
            <div className="hover:bg-gray-200 rounded-md p-1">
              <Menu.Button>
                {user ? (
                  <img
                    className="h-6 rounded-full inline-block"
                    src={user?.avatar_url}
                  />
                ) : (
                  <UserCircleIcon className="w-6 h-6 inline-block" />
                )}

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
              <Menu.Items className="absolute flex flex-col gap-1 right-0 bg-white shadow p-1  rounded-lg">
                <Menu.Item>
                  <>
                    {user ? (
                      <Button onClick={onSignOut}>Sign Out</Button>
                    ) : (
                      <Button onClick={onSignIn}>Sign In</Button>
                    )}
                  </>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {pathname === "/" && user && (
          <Link
            to="/app"
            className=" bg-blue-400 w-full text-center inline-block text-white p-1"
          >
            You are signed in. Click to go to app
          </Link>
        )}
      </header>
    </>
  );
}
