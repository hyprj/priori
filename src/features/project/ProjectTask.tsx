export function ProjectTask({
  name,
  note,
  priority,
}: {
  name: string;
  note?: string;
  priority?: 1 | 2 | 3;
}) {
  return (
    <div>
      <p>{name}</p>
      {note && <p>{note}</p>}
      {priority && <p>Priority: {priority}</p>}
    </div>
  );
}
