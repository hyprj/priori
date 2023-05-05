export function SidebarNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="">
      <ul>{children}</ul>
    </nav>
  );
}
