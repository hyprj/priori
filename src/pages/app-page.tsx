import { Container } from "@components/container/Container";
import { Page } from "@layouts/Page/Page";

export function AppPage() {
  return (
    <Page>
      <Container>
        <h3 className="mt-16 text-3xl font-abhaya font-bold">Welcome back</h3>
        <p>Currently this is boring blank page, please use the sidebar</p>
      </Container>
    </Page>
  );
}
