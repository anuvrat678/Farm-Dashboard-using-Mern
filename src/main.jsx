import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider} from "react-router/dom";
import './index.css'

//importing pages for routing
import ProductPage from './pages/ProductPage.jsx';
import FarmerPage from './pages/FarmerPage.jsx';
import HomePage from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      index: true,
      element : <HomePage />,
    },
      {
      path: "farmer",
      element : <FarmerPage />,
    },{
      path: "product",
      element: <ProductPage />
    }]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
