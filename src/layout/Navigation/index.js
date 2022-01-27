import React, { lazy, Suspense, useEffect, useState } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { BASE_CURRENCY } from "../../app/types"
import "./index.scss"
const Modal = lazy(() => import("../../Modal"))

const Navigation = ({ current_currency = true, setBaseCurrency }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

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
        const currency = e.target.value.toUpperCase()
        if (currency.length > 3) return
        setBaseCurrency(currency)
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
                <Suspense fallback={null}>
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

const mapStateToProps = ({ current_currency }) => {
    return {
        current_currency,
    }
}
const mapDispatchToProps = (dispatch) => ({
    setBaseCurrency: (curr) =>
        dispatch({
            type: BASE_CURRENCY,
            payload: { curr },
        }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
