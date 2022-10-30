import React, { Dispatch, SetStateAction } from 'react'
import Modal from 'react-modal'
import './style.css'

interface ModalProp {
    modalOpen: boolean;
    handleClick: Dispatch<SetStateAction<boolean>>;
    setActiveTab: Dispatch<SetStateAction<string>>;
}

const SuccessModal = (props: ModalProp) => {
    const customStyles = { content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#71ccca',
        borderRadius: '12px'
    } }
    const handleModalClick = () => {
        props.handleClick(false)
        props.setActiveTab('tab1')
    }
    return (
        <Modal isOpen={props.modalOpen} style={customStyles}>
            <div className="modal-inner">
                <label>Expense Added Successfully!</label>
                <div className="take-home-button" onClick={handleModalClick}>
                    <i className="fi-rr-home"></i>
                    My Expenses
                </div>
            </div>
        </Modal>
    )
}

export default SuccessModal
