import React from 'react'

export const MessageSent = ({text}) => {
    return (
        <div className="px-3 py-1 rounded bg-primary text-white mb-3 animate__animated animate__bounceIn" style={{  marginRight: '60px' }}>
            {text}
        </div>
    )
}
