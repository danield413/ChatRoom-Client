import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Aside } from './Aside';
import { Chat } from './Chat';
import { addMessages, selectUser } from '../../actions/dashboard';
import { PrivateChat } from './PrivateChat';
import { useSocket } from '../../context/SocketProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';


export const DashboardScreen = () => {

    const { name } = useSelector(state => state.auth);
    const { selectedUser, messages } = useSelector(state => state.dashboard);
    const {sendMessage, sendPrivateMessage} = useSocket();
    const dispatch = useDispatch();

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
        <>
            <Helmet>
                <title>{ name } | ChatRoom</title>
                <meta name="description" content="Contenido principal del usuario y salas de chat" />
            </Helmet>
            
            <Container fluid>
                <Row>
                    <Col md={4} className="p-0 aside-color">
                        <Aside />
                    </Col>
                    <Col md={8} className="p-0 d-flex">
                        <div className="d-flex column-chat-dimensions" >
                            {selectedUser?.uid && selectUser?.name 
                            ? <PrivateChat sendPrivateMessage={sendPrivateMessage} />
                            : <Chat sendMessage={sendMessage} />
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
        
    )
}
