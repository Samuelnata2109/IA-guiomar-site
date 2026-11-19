import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { isHomeAnchor } from "./components/layout/homeAnchors";
import "./styles/global.css";
import "./features/code-quest/styles/adventure.css";
import "./features/code-quest/styles/adventure-world.css";
import "./features/code-quest/styles/ai-quest.css";
import "./features/laboratorio/styles/training.css";

if (isHomeAnchor(window.location.hash)) {
  window.history.replaceState(window.history.state, "", `#/${window.location.hash}`);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
