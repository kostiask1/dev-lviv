import { createStore } from "redux"
import { CONVERT_CURRENCY, BASE_CURRENCY, GET_RATES } from "./types"

const initialState = {
    current_currency: localStorage.getItem("currency_name") ?? "",
    rates: [],
    result: "",
    curr_2: "",
}

function currency(state = initialState, { type, payload }) {
    switch (type) {
        case CONVERT_CURRENCY:
            return {
                ...state,
                result: payload.result,
                curr_2: payload.curr_2,
            }

        case BASE_CURRENCY:
            localStorage.setItem("currency_name", payload.curr)
            return { ...state, current_currency: payload.curr }
        case GET_RATES:
            return { ...state, rates: payload.rates }
        default:
            return state
    }
}

const store = createStore(currency)

export default store
