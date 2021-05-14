import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Aside } from './Aside'
import { Chat } from './Chat'
import io from 'socket.io-client'
import { addMessages, addUsers } from '../../actions/dashboard'
import axios from 'axios'


export const DashboardScreen = () => {
    const [socket, setSocket] = useState();
    const { uid, name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const sendMessage = ( message ) => {
        socket.emit('send-message',{message, user: uid})
    }

    useEffect(() => {

        const newSocket = io('http://localhost:5000', {
        query: { uid, name }
        })
        setSocket(newSocket)

      return () => newSocket.close()
    }, [uid, name])

    useEffect(() => {
        if(!socket) return;

        socket.on('receive-messages', (payload) => {
            dispatch( addMessages(payload) )
        })

        return () => socket.off('receive-messages')
    }, [socket, dispatch])

    useEffect(() => {
        if(!socket) return;

        socket.on('created-message', (payload) => {
            dispatch( addMessages(payload) )
        })

        return () => socket.off('created-message')
    }, [socket, dispatch])

    useEffect(() => {
        if(!socket) return;

        socket.on('active-users', (payload) => {
            dispatch( addUsers(payload) );
        })

        return () => socket.off('active-users')
    }, [socket, dispatch]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/messages/get-all`, {
            headers: {
                'x-token': localStorage.getItem('chat-token'),
                'Content-Type': 'application/json'
            }
        }).then( ( {data} ) => dispatch( addMessages(data.messages) ))

    }, [dispatch])

    return (
        
            <Container fluid style={{ height: '100vh', width: '100%'}}>
                <Row style={{ height: '100%' }}>
                    <Col md={3} style={{ background: '#262D31' }} className="border-end">
                        <Aside />
                    </Col>
                    <Col md={9} className="p-0">
                        <div className="d-flex" style={{ height: '100vh', width: '100%'}}>
                            <Chat sendMessage={sendMessage} />
                        </div>
                    </Col>
                </Row>
            </Container>

    )
}
