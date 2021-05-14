import React from 'react'

export const MessageReceived = ({text, name, date}) => {

    return (
        <div className="px-3 py-1 d-flex flex-column rounded text-white mb-3 animate__animated animate__bounceIn" style={{ paddingLeft: '10px', paddingRight: '20px', background: '#262D31', marginLeft: '60px'}}>
            <div className="lead fw-bold" style={{ fontSize: '14px'}}>{name}</div>
            {text}
            <span className="d-block text-muted align-self-end" style={{ fontSize: '12px' }}>{date}</span>
        </div>
    )
}
