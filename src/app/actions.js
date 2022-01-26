import { CONVERT_CURRENCY, BASE_CURRENCY, GET_RATES } from "./types"

const baseCurrency = ({ curr }) => {
    return {
        type: BASE_CURRENCY,
        payload: { curr },
    }
}

const convertCurrencies = ({ result, curr_2 }) => {
    return {
        type: CONVERT_CURRENCY,
        payload: { curr_2, result },
    }
}

const getRates = (rates) => {
    return {
        type: GET_RATES,
        payload: { rates },
    }
}
export { baseCurrency, convertCurrencies, getRates }
