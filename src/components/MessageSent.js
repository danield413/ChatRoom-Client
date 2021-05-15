import React from 'react'
import PropTypes from 'prop-types';


export const MessageSent = ({text, date}) => {

    return (
        <div className="px-3 py-1 d-flex flex-column rounded bg-success text-white mb-3 animate__animated animate__bounceIn" style={{  marginRight: '60px' }}>
            {text}
            <span className="d-block text-light align-self-end" style={{ fontSize: '12px' }}>{date}</span>
        </div>
    )
}

MessageSent.propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}