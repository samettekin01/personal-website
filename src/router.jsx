import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/home";
import Project from "./components/project/project";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import App from "./App";
import AdminPanel from "./components/admin/adminPanel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:
            [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/projects",
                    element: <Project />
                },
                {
                    path: "/contact",
                    element: <Contact />
                },
                {
                    path: "/adminpanel",
                    element: <AdminPanel />
                }
            ]
    }
])

export default router;