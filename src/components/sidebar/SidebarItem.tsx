import { To, useLocation, Link } from "react-router-dom";

export function SidebarItem({
  to,
  name,
  onClick,
}: {
  to: To;
  name: string;
  onClick: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const variant = isActive
    ? "bg-neutral-200 hover:bg-neutral-300 dark:bg-slate-500"
    : "hover:dark:bg-slate-500 ";

  return (
    <Link to={to} onClick={onClick}>
      <li className={`${variant} my-1 w-full rounded py-1 pl-4  `}>{name}</li>
    </Link>
  );
}
