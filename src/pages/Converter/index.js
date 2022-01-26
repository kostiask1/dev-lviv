import React from "react"
import useLocalStorage from "../../hooks/useLocalStorage"
import "./index.scss"

const Converter = () => {
    const [name, setName] = useLocalStorage("Rate")

    console.log(name)

    return <h1>Converter page</h1>
}

export default Converter
