// import React, { useContext, useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client'


// const SocketContext = React.createContext();

// export const useSocket = () => {
//     return useContext(SocketContext)
// }


// export const SocketProvider = ({ children }) => {

//     const [socket, setSocket] = useState();
//     const { uid, name } = useSelector(state => state.auth)


//     const sendMessage = ( message, name ) => {
//         socket.emit('send-message',{message, from: uid, fromName: name})
//     }

//     useEffect(() => {

//         const newSocket = io('http://localhost:5000', {
//         query: { uid, name }
//         })
//         setSocket(newSocket)

//       return () => newSocket.close()
//     }, [uid, name])

//     useEffect(() => {
//         if(!socket) return;

//         socket.on('receive-messages', (payload) => {
//             setMessages(payload)
//         })

//         return () => socket.off('receive-messages')
//     }, [socket, setMessages])

//     useEffect(() => {
//         if(!socket) return;

//         socket.on('created-message', (payload) => {
//             setMessages(payload)
//         })

//         return () => socket.off('created-message')
//     }, [socket, setMessages])

//     useEffect(() => {
//         if(!socket) return;

//         socket.on('active-users', (payload) => {
//             setUsers(payload)
//         })

//         return () => socket.off('active-users')
//     }, [socket, setUsers]);
    
//     const value = {
//         socket,
//         sendMessage,
//         listUsers
//     }

//     return (
//         <SocketContext.Provider value={ value }>
//             { children }
//         </SocketContext.Provider>
//     )
// }
