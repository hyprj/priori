import React from "react";

export function SideBarGroup({
  children,
  title,
  headerElement,
}: {
  children: React.ReactNode;
  title: string;
  headerElement?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-end  justify-between">
        <p className=" ml-4 mt-8 text-sm font-semibold">{title}</p>
        {headerElement}
      </div>
      {children}
    </div>
  );
}
