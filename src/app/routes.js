import { lazy } from "react"
const Converter = lazy(() => import("../pages/Converter"))
const Rates = lazy(() => import("../pages/Rates"))

const routes = [
    { path: "/", Component: Converter },
    { path: "/rates", Component: Rates },
]

export default routes
