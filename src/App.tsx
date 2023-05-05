import { AppLayout } from "@layouts/AppLayout/AppLayout";
import { AppPage } from "@pages/app-page";
import { ErrorPage } from "@pages/error-page";
import { ProjectPage } from "@pages/project-page";
import { ProjectsPage } from "@pages/projects-page";
import { Routes, Route, Outlet } from "react-router-dom";

function Root() {
  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<AppPage />} />
        <Route path="projects">
          <Route index element={<ProjectsPage />} />
          <Route path=":id" element={<ProjectPage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
