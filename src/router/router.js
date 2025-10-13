import { createBrowserRouter } from "react-router";
import Homepage from "../pages/Homepage";
import Lostitems from "../pages/Lostitems";
import ReportLostItem from "../pages/ReportLostItem";
import Founditems from "../pages/Founditems";
import ReportFoundItem from "../pages/ReportFoundItem";

const router  = createBrowserRouter([
    {
      path: "/",
      Component: Homepage
    },
    {
      path: "/lost-items",
      Component: Lostitems
    },
    {
      path: "/report-lost-item",
      Component: ReportLostItem
    },
    {
      path: "/found-items",
      Component: Founditems
    },
    {
      path: "/report-found-item",
      Component: ReportFoundItem
    }
]);

export default router;