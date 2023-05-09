import { AppPage } from "@pages/app-page";
import { ErrorPage } from "@pages/error-page";
import { LandingPage } from "@pages/landing-page";
import { ProjectPage } from "@pages/project-page";
import { ProjectsPage } from "@pages/projects-page";
import { Routes, Route } from "react-router-dom";
import { Root } from "./pages/Root";
import { LoginPage } from "@pages/login-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app">
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
