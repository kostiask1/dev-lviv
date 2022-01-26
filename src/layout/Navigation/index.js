import React, { useEffect, useState, lazy, Suspense } from "react"
import { NavLink } from "react-router-dom"
import "./index.scss"
import store from "../../app/store"
import { BASE_CURRENCY } from "../../app/types"
const Modal = lazy(() => import("../../Modal"))

const Navigation = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [state, setState] = useState({})
    const { current_currency = true } = state

    useEffect(() => {
        store.subscribe(() => setState(() => store.getState()))
    }, [])

    useEffect(() => {
        setState(store.getState())
    }, [store])

    useEffect(() => {
        if (!current_currency) {
            setModalIsOpen(true)
        }
    }, [current_currency])

    const closeModal = () => {
        setModalIsOpen(false)
    }
    const openModal = () => {
        setModalIsOpen(true)
    }

    const chooseCurrency = (e) => {
        store.dispatch({
            type: BASE_CURRENCY,
            payload: { curr: e.target.value.toUpperCase() },
        })
    }
    return (
        <>
            <nav className="navigation">
                <NavLink
                    className={(props) =>
                        `navigation__link${
                            props.isActive ? " navigation__link--active " : ""
                        }`
                    }
                    to="dev-lviv/"
                >
                    Converter
                </NavLink>
                <NavLink
                    className={(props) =>
                        `navigation__link${
                            props.isActive ? " navigation__link--active " : ""
                        }`
                    }
                    to="dev-lviv/rates"
                >
                    Rates
                </NavLink>
                {current_currency} =&nbsp;
                <button onClick={openModal}>Change currency</button>
            </nav>
            {modalIsOpen ? (
                <Suspense fallback={<p>Loading modal...</p>}>
                    <Modal close={closeModal}>
                        <h2>Change your currency code:</h2>
                        <input
                            type="text"
                            className="modal__input"
                            value={current_currency}
                            placeholder="Enter your currency"
                            onChange={(e) => chooseCurrency(e)}
                        />
                    </Modal>
                </Suspense>
            ) : null}
        </>
    )
}

export default Navigation
