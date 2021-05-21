import React, { useCallback, useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addChatMessages, addMessages, addUsers } from '../actions/dashboard';
import { setStats } from '../actions/stats';

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext)
}

export const SocketProvider = ( {children} ) => {

    const [socket, setSocket] = useState();
    const { uid, name } = useSelector(state => state.auth);
    const { selectedUser } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();


    const sendMessage = useCallback(( message ) => {
        const dateDayJS = dayjs(new Date());
        const newHour = (dateDayJS.$H > 12) ? dateDayJS.$H -= 12 : dateDayJS.$H;
        const date = 
        `${newHour}:${dateDayJS.$m.toString().length === 1 ? `0${dateDayJS.$m}` : dateDayJS.$m} ${dateDayJS.$D}/${dateDayJS.$W}/${dateDayJS.$y}`;

        socket.emit('send-message',{message, user: uid, date})
    }, [socket, uid]);

    const sendPrivateMessage = useCallback(( message ) => {
        const dateDayJS = dayjs(new Date());
        const newHour = (dateDayJS.$H > 12) ? dateDayJS.$H -= 12 : dateDayJS.$H;
        const date = 
        `${newHour}:${dateDayJS.$m.toString().length === 1 ? `0${dateDayJS.$m}` : dateDayJS.$m} ${dateDayJS.$D}/${dateDayJS.$W}/${dateDayJS.$y}`;

        socket.emit('send-private-message', [{message, date}, {uid: selectedUser.uid, name: selectedUser.name}]);
    }, [selectedUser?.uid, selectedUser?.name, socket]);

    useEffect(() => {
        if(socket) return;
        const newSocket = io('http://localhost:5000', {
        query: { uid, name }
        })
        setSocket(newSocket)
        
      return () => newSocket.close()
    }, [uid, name, socket]);

    useEffect(() => {
        if(!socket) return;
        socket.on('receive-messages', (payload) => {
            dispatch( addMessages(payload) )
        })

        return () => socket.off('receive-messages')
    }, [socket, dispatch]);

    useEffect(() => {
        if(!socket) return;

        socket.on('created-message', (payload) => {
            dispatch( addMessages(payload) )
        })

        return () => socket.off('created-message')
    }, [socket, dispatch]);

    useEffect(() => {
        if(!socket) return;

        socket.on('active-users', (payload) => {
            dispatch( addUsers(payload) );
        })

        return () => socket.off('active-users')
    }, [socket, dispatch]);

    useEffect(() => {
        if(!socket) return;
        
        socket.on('private-messages', (payload) => {
            dispatch( addChatMessages(payload) )
        })

        return () => socket.off('private-messages')
    }, [socket, dispatch]);

    

    useEffect(() => {

        const newSocket = io('http://localhost:5000', {
        query: { uid, name }
        })
        setSocket(newSocket)
  
        return () => newSocket.close();
      }, [uid, name]);
  
      useEffect(() => {
        if(!socket) return;
  
        socket.on('get-stats', (payload) => {
            dispatch( setStats(payload) )
        })
  
        return () => socket.off('get-stats')
    }, [socket, dispatch]); 


    const values = {
        sendMessage,
        sendPrivateMessage
    }

    return (
        <SocketContext.Provider value={values}>
            { children }
        </SocketContext.Provider>
    )
}
