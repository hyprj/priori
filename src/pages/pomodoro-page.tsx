import { Container } from "@components/container/Container";
import { PomodoroHeader } from "@features/pomodoro/components/PomodoroHeader/PomodoroHeader";
import { PomodoroTimer } from "@features/pomodoro/components/PomodoroTimer/PomodoroTimer";
import { PomodoroTasks } from "@features/pomodoro/components/pomodoroTasks/PomodoroTasks";
import { Page } from "@layouts/Page/Page";

export function PomodoroPage() {
  return (
    <Page>
      <Container size="xxs">
        <div className="mb-60 mt-16">
          <PomodoroHeader />
          <PomodoroTimer />
          <PomodoroTasks />
        </div>
      </Container>
    </Page>
  );
}
