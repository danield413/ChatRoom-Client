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
            className="px-3 py-1 d-flex flex-column rounded text-white mb-3 animate__animated animate__fadeIn" 
            style={{ paddingLeft: '10px', paddingRight: '20px', background: '#262D31', marginLeft: '60px', maxWidth: '60%'}}
        >
            {name && 
            <div className="lead fw-bold d-flex justify-content-between align-items-center" style={{ fontSize: '14px'}}>
                {name}
                <DropdownButton title="" size="sm" id="dropdown-item-button">
                    <Dropdown.Item as="button" onClick={handleCopy} className="bg-secondary text-dark">
                        Copiar texto
                    </Dropdown.Item>
                </DropdownButton>
            </div>}
            
            {text}
            <span className="d-block text-muted align-self-end" style={{ fontSize: '12px' }}>{date}</span>
        </motion.div>
    )
}

MessageReceived.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string,
    date: PropTypes.string.isRequired
}