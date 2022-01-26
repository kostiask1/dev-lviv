import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import routes from "./app/routes"
import Navigation from "./layout/Navigation"

function App() {
    return (
        <>
            <Navigation />
            <div className="container">
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        {routes.map(({ path, Component }) => (
                            <Route
                                path={path}
                                element={<Component />}
                                key={path}
                            />
                        ))}
                    </Routes>
                </Suspense>
            </div>
        </>
    )
}

export default App
