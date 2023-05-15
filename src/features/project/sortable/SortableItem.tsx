import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({
  id,
  children,
  type,
}: {
  id: string;
  children: React.ReactNode;
  type: "task" | "section";
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id, data: { type: type } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
