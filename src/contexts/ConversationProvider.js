import React, { useContext } from 'react'
// import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext();

export const useConversation = () => {
    return useContext(ConversationContext)
}

export const ConversationProvider = ({ id = null, name = null, children }) => {

    const values = {
        
    }

    return (
        <ConversationContext.Provider value={ values }>
            { children }
        </ConversationContext.Provider>
    )
}
