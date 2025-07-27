import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./styles/index.css";
import Root from "./routes/root.js";
import GamePage from "./routes/game-page.js";
import ScorePage from "./routes/score-page.js";
import CreditsPage from "./routes/credits-page.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/swatter">
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<GamePage />} />
          <Route path="scores" element={<ScorePage />} />
          <Route path="credits" element={<CreditsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
