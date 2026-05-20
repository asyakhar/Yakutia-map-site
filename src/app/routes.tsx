import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { MapView } from "./pages/MapView";
import { PlaceDetail } from "./pages/PlaceDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/map",
    Component: MapView,
  },
  {
    path: "/place/:id",
    Component: PlaceDetail,
  },
]);
