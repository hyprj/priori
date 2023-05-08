import { QueryBoundaries } from "@components/queryBoundaries/QueryBoundaries";
import { AppLayout } from "@layouts/AppLayout/AppLayout";
import { AppPage } from "@pages/app-page";
import { ErrorPage } from "@pages/error-page";
import { LandingPage } from "@pages/landing-page";
import { ProjectPage } from "@pages/project-page";
import { ProjectsPage } from "@pages/projects-page";
import { Routes, Route, Outlet } from "react-router-dom";

function Root() {
  return (
    <QueryBoundaries>
      <Outlet />
    </QueryBoundaries>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppPage />} />
          <Route path="projects">
            <Route index element={<ProjectsPage />} />
            <Route path=":id" element={<ProjectPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
