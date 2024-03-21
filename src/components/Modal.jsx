import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reveal } from "../Redux/Slices/modal";

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    const ticket = useSelector((state) => state.ticket);
    const modal = useSelector((state) => state.modal);

    const handleOnClose = (e) => {
        dispatch(reveal({ show: false }));
    };

    return (
        <Fragment>
            {modal.show ? (
                <div className="modal-plain" onClick={handleOnClose}>
                    <div className="modal-plain__modal modal">
                        <h3 className="modal__title">
                            {ticket.ticket_id} - {ticket.ticket_title}
                        </h3>

                        <div className="mt-1">
                            <p>{modal.content?.value?.directive}</p>
                            {children}
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default Modal;
