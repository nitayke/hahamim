import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as JotaiProvider } from "jotai";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout";
import Questioneer from "./routes/Questioneer/Questioneer";
import About from "./routes/About/About";
import Admin from "./routes/Admin/Admin";
import Records from "./routes/Records/Records";
import AddQuestion from "./routes/AddQuestion/AddQuestion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Questioneer />,
      },
      {
        path: "/records",
        element: <Records />,
      },
      {
        path: "/add-question",
        element: <AddQuestion />,
      },
      {
        path: "/",
        element: <Questioneer />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <JotaiProvider>
      <RouterProvider router={router} />
    </JotaiProvider>
  </React.StrictMode>
);
