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
    ? "bg-gray-100 text-primary hover:bg-gray-200"
    : "text-neutral-700 hover:bg-gray-100 hover:text-primary";

  return (
    <Link to={to}>
      <li
        className={`${variant} rounded-full font-semibold py-2 px-6 text-center my-2`}
      >
        {name}
      </li>
    </Link>
  );
}
