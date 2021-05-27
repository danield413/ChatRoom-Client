import { motion } from 'framer-motion';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';

export const ModalInfo = ({show, handleClose, participants}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Información</Modal.Title>
                <motion.button 
                    onClick={handleClose}
                    className="btn"
                    whileTap={{scale: 1.4}}
                >
                    <GrClose />
                </motion.button>
            </Modal.Header>
            <Modal.Body >
                <h4 className="fw-bold text-center">Participantes</h4>
                {
                !participants 
                ?<div className="w-100">
                    <div className="alert alert-info text-center text-resp">
                    Todos los usuarios registrados en <strong>ChatRoom</strong>
                    </div>
                    <img src="./assets/chatting-group.svg" alt="chatting-group" className="svg"/>
                </div>
                : <div className="w-100">
                    <div className="alert alert-success text-center">
                        <strong>{participants[0]} - {participants[1]}</strong>
                    </div>
                    <img src="./assets/chatting.svg" alt="chatting" className="svg"/>
                </div>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}
