import React, { useContext } from 'react'
// import { useSocket } from './SocketProvider';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ id = null, name = null, children }) => {

    const values = {
        
    }

    return (
        <AuthContext.Provider value={ values }>
            { children }
        </AuthContext.Provider>
    )
}
