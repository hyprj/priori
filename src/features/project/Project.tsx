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
            <AddSection />
            <header className="font-semibold mb-2 text-md border-b-[1px] border-slate-200 flex items-baseline gap-6">
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
                  className="my-4 border-b-[1px] border-slate-200"
                >
                  <div className="relative">
                    <div className="absolute -left-7">m</div>
                    <div className="flex">
                      <CheckCircleIcon
                        className="h-6 mr-2 text-gray-400"
                        strokeWidth={0.5}
                      />
                      <div>
                        <p className="pt-[3px]">{task.name}</p>
                        {task.note && (
                          <p className="text-sm text-gray-700">{task.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <SectionFooter sectionId={section.id} />
          </section>
        ))}
      <AddSection />
    </div>
  );
}
