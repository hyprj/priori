export function Overlay({
  onClick,
  darken = false,
}: {
  onClick?: () => void;
  darken?: boolean;
}) {
  const darkenClass = darken ? "bg-black bg-opacity-25" : "";
  return (
    <div
      className={`fixed top-0 bottom-0 z-20 inset-0 ${darkenClass}`}
      onClick={onClick}
    />
  );
}
