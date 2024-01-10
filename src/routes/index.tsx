import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages"
import Root from "./root"
import Register from "../pages/register"
import Login from "../pages/login"
import About from "../pages/about"
import Task1 from "../pages/weeks/week-1/task_1"
import Task2 from "../pages/weeks/week-1/task_2"
import PerfTask1 from "../pages/performance/perf_task_1"
import PerfTask2 from "../pages/performance/perf_task_2"
import PerfTask3 from "../pages/performance/perf_task_3"
import PerfTask4 from "../pages/performance/perf_task_4"
import PerfTask5 from "../pages/performance/perf_task_5"

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
                path: "hafta/1/task-1",
                element: <Task1 />
            },
            {
                path: "hafta/1/task-2",
                element: <Task2 />
            },
            {
                path: "performans/task-1",
                element:<PerfTask1/>
            },
            {
                path: "performans/task-2",
                element:<PerfTask2/>
            },
            {
                path: "performans/task-3",
                element:<PerfTask3/>
            },
            {
                path: "performans/task-4",
                element:<PerfTask4/>
            },
            {
                path: "performans/task-5",
                element:<PerfTask5/>
            }
        ]
    }
])