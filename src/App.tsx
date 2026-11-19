import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/HomePage";
import PlaceholderPage from "./pages/PlaceholderPage";

const CoursePage = lazy(() => import("./pages/CoursePage"));
const AreasPage = lazy(() => import("./pages/AreasPage"));
const CodeQuestPage = lazy(() => import("./pages/CodeQuestPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SchoolPage = lazy(() => import("./pages/SchoolPage"));

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="curso" element={<Suspense fallback={<p role="status">Carregando página…</p>}><CoursePage /></Suspense>} />
          <Route path="areas" element={<Suspense fallback={<p role="status">Carregando página…</p>}><AreasPage /></Suspense>} />
          <Route path="code-quest" element={<Suspense fallback={<p role="status">Carregando página…</p>}><CodeQuestPage /></Suspense>} />
          <Route path="projetos" element={<Suspense fallback={<p role="status">Carregando página…</p>}><ProjectsPage /></Suspense>} />
          <Route path="escola" element={<Suspense fallback={<p role="status">Carregando página…</p>}><SchoolPage /></Suspense>} />
          <Route path="*" element={<PlaceholderPage title="Página não encontrada" missing />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
