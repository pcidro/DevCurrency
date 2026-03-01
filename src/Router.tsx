import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import NotFound from "./Pages/NotFound";
import Layout from "./Components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:cripto",
        element: <Details />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export { router };
