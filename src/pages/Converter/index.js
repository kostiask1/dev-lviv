import React, { useRef, useEffect, useState } from "react"
import "./index.scss"
import store from "../../app/store"
import axios from "axios"
import { CONVERT_CURRENCY } from "../../app/types"
const API = process.env.REACT_APP_API_KEY

const Converter = () => {
    const [state, setState] = useState({})
    const { curr_2, result } = state
    const inputRef = useRef(null)

    useEffect(() => {
        store.subscribe(() => setState(() => store.getState()))
    }, [])

    useEffect(() => {
        setState(store.getState())
    }, [store])

    const convertValue = () => {
        let value = inputRef.current.value
        value = value.split(" ")
        if (value.length !== 4) return
        const quantity = +value[0]
        const curr_1 = value[1]
        const curr_2 = value[3]
        if (
            typeof quantity === "number" &&
            curr_1.length === 3 &&
            curr_2.length === 3
        )
            convertCurrencies({ quantity, curr_1, curr_2 })
    }

    const convertCurrencies = ({ quantity, curr_1, curr_2 }) => {
        axios
            .get(
                `https://freecurrencyapi.net/api/v2/latest?apikey=${API}&base_currency=${curr_1}`
            )
            .then((response) => {
                if (response.status === 200) {
                    const rates = response.data.data
                    let result = rates[curr_2] * quantity
                    result = result.toFixed(2)
                    return store.dispatch({
                        type: CONVERT_CURRENCY,
                        payload: { curr_2, result },
                    })
                }
            })
    }

    return (
        <div className="converter">
            <p>
                Enter [QUANTITY] [CURRENCY] in [CURRENCY] like = 15 USD in UAH
            </p>
            <div className="converter__wrap">
                <input
                    ref={inputRef}
                    className="converter__input"
                    type="text"
                    placeholder="Enter here..."
                />
                {result ? (
                    <span className="converter__result">
                        &nbsp;= {result} {curr_2}
                    </span>
                ) : null}
            </div>
            <button className="converter__submit" onClick={convertValue}>
                Convert
            </button>
        </div>
    )
}

export default Converter
