import React from 'react'

export const MessageReceived = ({text, name}) => {
    return (
        <div className="px-3 py-1 rounded text-white mb-3 animate__animated animate__bounceIn" style={{ paddingLeft: '10px', paddingRight: '20px', background: '#262D31', marginLeft: '60px'}}>
            <div className="lead fw-bold" style={{ fontSize: '14px'}}>{name}</div>
            {text}
        </div>
    )
}
