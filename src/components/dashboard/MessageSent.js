import React from 'react'
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const MessageSent = ({text, date}) => {

    return (
        <motion.div 
            animate={{
                scale: [1, 1.1, 1]
            }}
            className="px-3 py-1 d-flex flex-column rounded text-white mb-3 animate__animated animate__fadeIn" 
            style={{  marginRight: '60px', backgroundColor: '#056162', maxWidth: '60%' }}
        >
            {text}
            <span className="d-block text-light align-self-end" style={{ fontSize: '12px' }}>{date}</span>
        </motion.div>
    )
}

MessageSent.propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}