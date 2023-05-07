export function ProjectContent({ sections }: { sections: ISection[] }) {
  return (
    <main>
      {sections.map((section) => (
        <ProjectSection
          key={section.id}
          name={section.name}
          tasks={section.tasks}
        />
      ))}
    </main>
  );
}
