import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import Root from "./routes/root.js";
import GamePage from "./routes/game-page.js";
import ScorePage from "./routes/score-page.js";
import CreditsPage from "./routes/credits-page.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <GamePage />
            },
            {
                path: "/scores",
                element: <ScorePage />
            },
            {
                path: "/credits",
                element: <CreditsPage />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);
