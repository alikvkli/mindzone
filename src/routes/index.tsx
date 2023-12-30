import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages"
import Root from "./root"
import Register from "../pages/register"
import Login from "../pages/login"
import About from "../pages/about"
import Task1 from "../pages/weeks/week-1/task_1"
import Task2 from "../pages/weeks/week-1/task_2"

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
                path: "week/1/task-1",
                element: <Task1 />
            },
            {
                path: "week/1/task-2",
                element: <Task2 />
            }
        ]
    }
])