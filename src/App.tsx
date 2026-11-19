import { HashRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import AreasPage from "./pages/AreasPage";
import CodeQuestPage from "./pages/CodeQuestPage";
import ProjectsPage from "./pages/ProjectsPage";
import SchoolPage from "./pages/SchoolPage";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="curso" element={<CoursePage />} />
          <Route path="areas" element={<AreasPage />} />
          <Route path="code-quest" element={<CodeQuestPage />} />
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="escola" element={<SchoolPage />} />
          <Route path="*" element={<PlaceholderPage title="Página não encontrada" missing />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
