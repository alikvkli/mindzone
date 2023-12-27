import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages"
import Root from "./root"
import Register from "../pages/register"
import Login from "../pages/login"
import About from "../pages/about"
import Task from "../pages/task"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "kayit-ol",
                element: <Register />
            },
            {
                path: "giris-yap",
                element: <Login />
            },
            {
                path: "hakkimizda",
                element: <About />
            },
            {
                path: "task/:id",
                element: <Task />
            }
        ]
    }
])