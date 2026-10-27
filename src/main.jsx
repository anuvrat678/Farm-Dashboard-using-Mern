import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
} from "react-router";

import {
  RouterProvider,
} from "react-router/dom";

import App from "./App.jsx";

import HomePage from "./pages/Home.jsx";
import FarmerPage from "./pages/FarmerPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import FarmInventoryManager from "./pages/FarmInventoryManager.jsx";

import { FarmerProvider } from "./context/FarmerContext.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "farmer",
        element: <FarmerPage />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "inventory",
        element: <FarmInventoryManager />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FarmerProvider>
      <RouterProvider router={router} />
    </FarmerProvider>
  </StrictMode>
);