import { Container } from "@components/container/Container";
import { useUser } from "@features/auth/useUser";
import { PersonalSection } from "@features/personalTasks/PersonalSection";
import { PersonalSectionTasks } from "@features/personalTasks/PersonalSectionTasks";
import { PersonalTasksFooter } from "@features/personalTasks/PersonalTasksFooter";
import { Page } from "@layouts/Page/Page";
import { getPersonalTasks } from "@services/db";
import { useQuery } from "react-query";
import { DBPersonalTask } from "src/types/dbTypes";

export function AppPage() {
  const user = useUser();

  if (!user) return null;
  const { data } = useQuery("personalTasks", () => getPersonalTasks(user.id), {
    suspense: true,
  });

  if (!data) return null;

  let todayTasks: DBPersonalTask[] = [];
  let overdueTasks: DBPersonalTask[] = [];

  const now = new Date();
  data.forEach((task) => {
    if (new Date(task.created_at).getDate() === now.getDate()) {
      todayTasks.push(task);
    } else {
      overdueTasks.push(task);
    }
  });

  return (
    <Page>
      <Container>
        <h3 className="mb-8 mt-16 font-abhaya text-3xl font-bold">{`${now.toLocaleString(
          "en",
          { weekday: "long", month: "long", day: "numeric" }
        )}`}</h3>
        <PersonalSection name="Today" tasksAmount={todayTasks.length}>
          <PersonalSectionTasks tasks={todayTasks} />
          <PersonalTasksFooter userId={user.id} />
        </PersonalSection>
        <PersonalSection name="Overdue" tasksAmount={overdueTasks.length}>
          <PersonalSectionTasks tasks={overdueTasks} />
        </PersonalSection>
      </Container>
    </Page>
  );
}
