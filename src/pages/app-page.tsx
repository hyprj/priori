import { Container } from "@components/container/Container";
import { useAuth } from "@features/auth/AuthProvider";
import { PersonalSection } from "@features/personalTasks/PersonalSection";
import { PersonalSectionTasks } from "@features/personalTasks/PersonalSectionTasks";
import { PersonalTasksFooter } from "@features/personalTasks/PersonalTasksFooter";
import { Page } from "@layouts/Page/Page";
import { getPersonalTasks } from "@services/db";
import { useQuery } from "react-query";
import { queryClient } from "@src/main";
import { categorizeTasksByDate } from "@src/utils/utils";

export function AppPage() {
  const { user } = useAuth();

  if (!user) return null;
  const { data, refetch } = useQuery(
    "personal-tasks",
    () => getPersonalTasks(user.id),
    {
      suspense: true,
      onSuccess: (data) => {
        data.forEach((task) => {
          queryClient.setQueryData(["personal-tasks", task.id], task);
        });
      },
    }
  );

  if (!data) return null;

  const { todayTasks, overdueTasks } = categorizeTasksByDate(data);

  return (
    <Page>
      <Container>
        <h3 className="mb-8 mt-16 font-abhaya text-3xl font-bold">{`${new Date().toLocaleString(
          "en",
          { weekday: "long", month: "long", day: "numeric" }
        )}`}</h3>
        <PersonalSection name="Today" tasksAmount={todayTasks.length}>
          <PersonalSectionTasks refetch={refetch} tasks={todayTasks} />
          <PersonalTasksFooter userId={user.id} />
        </PersonalSection>
        <PersonalSection name="Overdue" tasksAmount={overdueTasks.length}>
          <PersonalSectionTasks refetch={refetch} tasks={overdueTasks} />
        </PersonalSection>
      </Container>
    </Page>
  );
}
