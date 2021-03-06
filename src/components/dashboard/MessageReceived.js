import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const MessageReceived = ({text, name, date}) => {

    const handleCopy = () => {
        navigator.clipboard.writeText( text ).then(() => {
            Swal.fire('Mensaje copiado')
        })
    }

    return (
        <motion.div 
            animate={{
                scale: [1, 1.1, 1]
            }}
            className="text-msg-res px-3 py-1 d-flex flex-column rounded text-white mb-3 animate__animated animate__fadeIn message-received" 
        >
            {name && 
            <div className="text-msg-res fw-bold d-flex justify-content-between align-items-center" >
                {name}
                <DropdownButton title="" size="sm" id="dropdown-item-button">
                    <Dropdown.Item as="button" onClick={handleCopy} className="bg-secondary text-light text-msg-res">
                        Copiar texto
                    </Dropdown.Item>
                </DropdownButton>
            </div>}
            
            {text}
            <span className="text-date d-block text-muted align-self-end">{date}</span>
        </motion.div>
    )
}

MessageReceived.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string,
    date: PropTypes.string.isRequired
}