import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/home";
import Project from "./components/Project/project";
import About from "./components/About/about";
import Contact from "./components/Contact/contact";
import App from "./App";

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
                }
            ]
    }
])

export default router;