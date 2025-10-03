import { createBrowserRouter } from "react-router";
import Homepage from "../pages/Homepage";
import Lostitems from "../pages/Lostitems";
import ReportLostItem from "../pages/ReportLostItem";
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
    
]);

export default router;