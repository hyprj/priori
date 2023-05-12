import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { IProject } from "src/types/types";
import { SectionFooter } from "./SectionFooter";
import { AddSection } from "./AddSection";

export function Project({ project }: { project: IProject }) {
  return (
    <div>
      {project.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <section className="m-4" key={section.id}>
            <AddSection
              projectId={project.id}
              order={project.sections.length + 1}
            />
            <header className="text-md mb-2 flex items-baseline gap-6 border-b-[1px] font-semibold dark:border-white/10">
              <span>{section.name}</span>
              <span className="text-xs text-gray-500">
                {`${section.tasks.length} tasks`}
              </span>
            </header>
            {section.tasks
              .sort((a, b) => a.order - b.order)
              .map((task) => (
                <div
                  key={task.id}
                  data-task-id={task.id}
                  className="my-4 border-b-[1px] dark:border-white/10"
                >
                  <div className="relative">
                    <div className="absolute -left-7">m</div>
                    <div className="flex">
                      <CheckCircleIcon
                        className="mr-2 h-6 text-gray-400"
                        strokeWidth={0.5}
                      />
                      <div>
                        <p className="pt-[3px]">{task.name}</p>
                        {task.note && (
                          <p className="text-cl-text-soft text-sm">
                            {task.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <SectionFooter sectionId={section.id} />
          </section>
        ))}
      <AddSection projectId={project.id} order={project.sections.length + 1} />
    </div>
  );
}
