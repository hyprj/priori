export function SideBarGroup({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      <p className=" mt-8 ml-4 text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}
