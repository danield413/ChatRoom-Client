import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Aside } from './Aside';
import { Chat } from './Chat';
import { addAllUsers, addMessages, selectUser } from '../../actions/dashboard';
import { PrivateChat } from './PrivateChat';
import { useSocket } from '../../context/SocketProvider';
import axios from 'axios';


export const DashboardScreen = () => {

    const { selectedUser, messages, users } = useSelector(state => state.dashboard);
    const {sendMessage, sendPrivateMessage} = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
       if(users.length === 0) {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/registered-users`, {
            headers: {
                'x-token': localStorage.getItem('chat-token'),
                'Content-Type': 'application/json'
            }
        }).then( ( {data} ) => dispatch( addAllUsers(data.allUsers) ))
       }

    }, [dispatch, users]);

    useEffect(() => {
       if(messages.length === 0) {
        axios.get(`${process.env.REACT_APP_API_URL}/messages/get-all`, {
            headers: {
                'x-token': localStorage.getItem('chat-token'),
                'Content-Type': 'application/json'
            }
        }).then( ( {data} ) => dispatch( addMessages(data.messages) ))
       }

    }, [dispatch, messages]);

    
    return (  
        <Container fluid>
            <Row>
                <Col md={4} style={{ background: '#262D31' }} className="p-0">
                    <Aside />
                </Col>
                <Col md={8} className="p-0 d-flex">
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
