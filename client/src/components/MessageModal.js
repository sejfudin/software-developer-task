import React from 'react';

import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MessageModal = ({ isOpen, toggleModal }) => {

    const message = useSelector(state => state.movies.message);
    return (
        <div>
            <Modal show={isOpen}
                size="sm" >
                <div className="modal-header">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={toggleModal}>
                    </button>
                </div>
                <div className="modal-body text-center">
                    <p>{message}</p>
                </div>
            </Modal>
        </div>
    )
}
export default MessageModal;