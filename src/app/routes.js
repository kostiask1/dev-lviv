import { lazy } from "react"
const Converter = lazy(() => import("../pages/Converter"))
const Rates = lazy(() => import("../pages/Rates"))

const routes = [
    { path: "dev-lviv/", Component: Converter },
    { path: "dev-lviv/rates", Component: Rates },
]

export default routes
