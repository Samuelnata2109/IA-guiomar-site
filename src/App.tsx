import { HashRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/HomePage";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="curso" element={<PlaceholderPage title="O curso" />} />
          <Route path="areas" element={<PlaceholderPage title="Áreas" />} />
          <Route path="code-quest" element={<PlaceholderPage title="Code Quest" />} />
          <Route path="projetos" element={<PlaceholderPage title="Projetos" />} />
          <Route path="escola" element={<PlaceholderPage title="A escola" />} />
          <Route path="*" element={<PlaceholderPage title="Página não encontrada" missing />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
