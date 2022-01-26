import "./index.scss"

const Modal = ({ children, close }) => {
    return (
        <div className="modal">
            <div className="modal__overlay" onClick={close} />
            <div className="modal__wrapper">
                <div className="modal__content">
                    <div onClick={close} className="times">
                        x
                    </div>
                    {children}
                    <button className="modal__btn" onClick={close}>
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
