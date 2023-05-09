import { QueryBoundaries } from "@components/queryBoundaries/QueryBoundaries";
import { Outlet } from "react-router-dom";
import { AppLayout } from "@layouts/AppLayout/AppLayout";

export function Root() {
  return (
    <QueryBoundaries>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </QueryBoundaries>
  );
}
