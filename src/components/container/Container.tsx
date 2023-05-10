const sizes = {
  md: "mx-4 lg:max-w-4xl lg:mx-auto",
  lg: "mx-4 lg:max-w-5xl lg:mx-auto",
};

export function Container({
  children,
  size = "lg",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  return <div className={` ${sizes[size]}`}>{children}</div>;
}
