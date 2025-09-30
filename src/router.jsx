import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Project from "./components/Project/Project";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import App from "./App";
import AdminPanel from "./components/Admin/AdminPanel";

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