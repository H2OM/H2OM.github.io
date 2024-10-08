import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Index from "./routes/Index";
import NotFound from "./routes/NotFound";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Index/>,
            errorElement: <NotFound/>,
        }
    ]);

    return <RouterProvider router={router}/>;
}
