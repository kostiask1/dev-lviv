import axios from "axios"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { GET_RATES } from "../../app/types"
import "./index.scss"
const API = process.env.REACT_APP_API_KEY

const Rates = ({ rates, current_currency, getRates: getRatesList }) => {
    const getRates = () => {
        axios
            .get(
                `https://freecurrencyapi.net/api/v2/latest?apikey=${API}&base_currency=${current_currency}`
            )
            .then((response) => {
                if (response.status === 200) {
                    const rates = response.data.data
                    return getRatesList({ rates: Object.entries(rates) })
                }
            })
    }

    useEffect(() => {
        if (current_currency && current_currency.length === 3) getRates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current_currency])

    return (
        <div className="rates">
            <button onClick={getRates}>
                Update list with base currency as {current_currency}
            </button>
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

const mapStateToProps = ({ rates, current_currency }) => ({
    rates,
    current_currency,
})

const mapDispatchToProps = (dispatch) => ({
    getRates: ({ rates }) =>
        dispatch({
            type: GET_RATES,
            payload: { rates },
        }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Rates)
