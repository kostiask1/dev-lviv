import React, { useEffect, useState } from "react"
import "./index.scss"
import axios from "axios"
import store from "../../app/store"
import { GET_RATES } from "../../app/types"
const API = process.env.REACT_APP_API_KEY

const Rates = () => {
    const [state, setState] = useState({})
    const { rates = [], current_currency } = state

    useEffect(() => {
        store.subscribe(() => setState(() => store.getState()))
    }, [])

    const getRates = () => {
        axios
            .get(
                `https://freecurrencyapi.net/api/v2/latest?apikey=${API}&base_currency=${current_currency}`
            )
            .then((response) => {
                if (response.status === 200) {
                    const rates = response.data.data
                    return store.dispatch({
                        type: GET_RATES,
                        payload: { rates: Object.entries(rates) },
                    })
                }
            })
    }

    useEffect(() => {
        setState(store.getState())
    }, [store])

    useEffect(() => {
        if (current_currency && current_currency.length === 3) getRates()
    }, [current_currency])

    return (
        <div className="rates">
            <ul>
                {rates.map((rate) => (
                    <li key={rate[0]}>
                        <span>{rate[0]} =</span>
                        <span>
                            {rate[1].toFixed(2)}
                            <small>({current_currency})</small>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Rates
