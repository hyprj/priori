import { To, useLocation, Link } from "react-router-dom";

export function SidebarItem({
  to,
  name,
  icon,
}: {
  to: To;
  name: string;
  icon?: React.ReactNode;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const variant = isActive
    ? "bg-neutral-200 hover:bg-neutral-200"
    : "text-neutral-700 hover:bg-gray-100 ";

  return (
    <Link to={to}>
      <li className={`${variant} rounded py-1 w-full pl-4  my-2`}>{name}</li>
    </Link>
  );
}
