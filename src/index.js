import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuperHeroes from "./components/SuperHeroes.page";
import RQSuperHeroes from "./components/RQSuperHeroes.page";
import HomePage from "./components/Home.page";
import RQSuperHeroPage from "./components/RQSuperHeroPage";
import RQParallelQueries from "./components/RQParallelQueries.page";
import DynamicParallelQueries from "./components/DynamicParallelQueries";
import DependentQueries from "./components/DependentQueries";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "traditional-super-heroes",
        element: <SuperHeroes />,
      },
      {
        path: "rq-super-heroes",
        element: <RQSuperHeroes />,
        children: [
          {
            path: ":heroId",
            element: <RQSuperHeroPage />,
          },
        ],
      },
      {
        path: "parallel-queries",
        element: <RQParallelQueries />,
      },
      {
        path: "dynamic-parallel-queries",
        element: <DynamicParallelQueries herosIds={[1, 3]} />,
      },
      {
        path: "dependent-queries",
        element: <DependentQueries email="vishwas@example.com" />,
      },
      {
        path: "paginated-queries",
        element: <PaginatedQueries />,
      },
      {
        path: "infinite-queries",
        element: <InfiniteQueries />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
