import React from 'react'
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const MessageSent = ({text, date}) => {

    return (
        <motion.div 
            animate={{
                scale: [1, 1.1, 1]
            }}
            className="text-msg-res px-3 py-1 d-flex flex-column rounded text-white mb-3 animate__animated animate__fadeIn message-sent" 
        >
            {text}
            <span className="text-date d-block text-light align-self-end fz-12px">{date}</span>
        </motion.div>
    )
}

MessageSent.propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}