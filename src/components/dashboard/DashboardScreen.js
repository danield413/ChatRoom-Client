import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import dayjs from 'dayjs';

import { Aside } from './Aside';
import { Chat } from './Chat';
import { addChatMessages, addMessages, addUsers, selectUser } from '../../actions/dashboard';
import { PrivateChat } from './PrivateChat';

export const DashboardScreen = () => {
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

        const newSocket = io('http://localhost:5000', {
        query: { uid, name }
        })
        setSocket(newSocket)

      return () => newSocket.close()
    }, [uid, name]);

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
    }, [socket, dispatch]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/messages/get-all`, {
            headers: {
                'x-token': localStorage.getItem('chat-token'),
                'Content-Type': 'application/json'
            }
        }).then( ( {data} ) => dispatch( addMessages(data.messages) ))

    }, [dispatch]);

    useEffect(() => {
        //Solo si hay un usuario (chat) seleccionado
        if(selectedUser?.uid) {
            axios.get(`${process.env.REACT_APP_API_URL}/messages/get-all-chat/${uid}/${selectedUser?.uid}`, {
                headers: {
                    'x-token': localStorage.getItem('chat-token'),
                    'Content-Type': 'application/json'
                }
            }).then( ( {data} ) => dispatch( addChatMessages(data.messagesChat) ))
        }
    }, [selectedUser?.uid, selectedUser?.name, uid, dispatch]);  

    return (  
        <Container fluid style={{ height: '100vh', width: '100%'}}>
            <Row style={{ height: '100%' }}>
                <Col md={4} style={{ background: '#262D31' }} className="border-end p-0">
                    <Aside />
                </Col>
                <Col md={8} className="p-0">
                    <div className="d-flex" style={{ height: '100vh', width: '100%'}}>
                        {selectedUser?.uid && selectUser?.name 
                        ? <PrivateChat sendPrivateMessage={sendPrivateMessage} />
                        : <Chat sendMessage={sendMessage} />
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
