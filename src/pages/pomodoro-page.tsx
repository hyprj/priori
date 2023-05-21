import { Container } from "@components/container/Container";
import { PomodoroHeader } from "@features/pomodoro/PomodoroHeader";
import { PomodoroTimer } from "@features/pomodoro/PomodoroTimer";
import { Page } from "@layouts/Page/Page";

export function PomodoroPage() {
  return (
    <Page>
      <Container size="xxs">
        <div className="mt-16">
          <PomodoroHeader />
          <PomodoroTimer />
        </div>
      </Container>
    </Page>
  );
}
