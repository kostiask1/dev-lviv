import React from "react"
import { NavLink } from "react-router-dom"
import "./index.scss"

const Navigation = () => {
    return (
        <nav className="navigation">
            <NavLink
                className={(props) =>
                    `navigation__link${
                        props.isActive ? " navigation__link--active " : ""
                    }`
                }
                to="/"
            >
                Converter
            </NavLink>
            <NavLink
                className={(props) =>
                    `navigation__link${
                        props.isActive ? " navigation__link--active " : ""
                    }`
                }
                to="rates"
            >
                Rates
            </NavLink>
        </nav>
    )
}

export default Navigation
