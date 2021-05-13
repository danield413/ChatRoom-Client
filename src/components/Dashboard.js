import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { SocketProvider } from '../contexts/SocketProvider'
import { Aside } from './Aside'
import { Chat } from './Chat'

export const Dashboard = ({ id , name, idLogout}) => {
    return (
        <SocketProvider id={id} name={name}>
            <Container fluid style={{ height: '100vh', width: '100%'}}>
                <Row style={{ height: '100%' }}>
                    <Col md={3} style={{ background: '#262D31' }} className="border-end">
                        <Aside name={name} idLogout={idLogout} id={id}/>
                    </Col>
                    <Col md={9} className="p-0">
                        <div className="d-flex" style={{ height: '100vh', width: '100%'}}>
                            <Chat name={name} id={id}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </SocketProvider>
        
    )
}
