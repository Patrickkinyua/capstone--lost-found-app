import { createBrowserRouter } from "react-router";
import Homepage from "../pages/Homepage";
import Lostitems from "../pages/Lostitems";
const router  = createBrowserRouter([
    {
      path: "/",
      Component: Homepage
    },
    {
      path: "/lost-items",
      Component: Lostitems
    },
    
]);

export default router;