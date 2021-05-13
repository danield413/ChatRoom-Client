import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'


const SocketContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext)
}


export const SocketProvider = ({ id, name, children }) => {

    const [socket, setSocket] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const sendMessage = ( message, name ) => {
        socket.emit('send-message',{message, from: id, fromName: name})
    }

    const listUsers = () => {
        const list = users.map( user => (
            user.name
        ))
        return list.join(', ');
    }

    useEffect(() => {

        const newSocket = io('http://localhost:5000', {
        query: { id, name }
        })
        setSocket(newSocket)

      return () => newSocket.close()
    }, [id, name])

    useEffect(() => {
        if(!socket) return;

        socket.on('receive-messages', (payload) => {
            setMessages(payload)
        })

        return () => socket.off('receive-messages')
    }, [socket, setMessages])

    useEffect(() => {
        if(!socket) return;

        socket.on('created-message', (payload) => {
            setMessages(payload)
        })

        return () => socket.off('created-message')
    }, [socket, setMessages])

    useEffect(() => {
        if(!socket) return;

        socket.on('active-users', (payload) => {
            setUsers(payload)
        })

        return () => socket.off('active-users')
    }, [socket, setUsers]);
    
    const value = {
        socket,
        sendMessage,
        messages,
        users,
        listUsers
    }

    return (
        <SocketContext.Provider value={ value }>
            { children }
        </SocketContext.Provider>
    )
}
