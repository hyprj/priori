import { Button } from "@components/button/Button";
import { Container } from "@components/container/Container";
import { Page } from "@layouts/Page/Page";

export function AppPage() {
  return (
    <Page>
      <Container>
        <h3 className="mt-16 font-abhaya text-3xl font-bold">Welcome back</h3>
        <p>Currently this is boring blank page, please use the sidebar</p>
        <Button>priamry button</Button>
      </Container>
    </Page>
  );
}
