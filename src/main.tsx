import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./features/code-quest/styles/adventure.css";
import "./features/code-quest/styles/adventure-world.css";
import "./features/code-quest/styles/ai-quest.css";
import "./features/laboratorio/styles/training.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
