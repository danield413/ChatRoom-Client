import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsFillCaretLeftFill } from 'react-icons/bs';

export const StatisticsScreen = () => {

    const {countMessages} = useSelector(state => state.stats)

    return (
        <Container fluid>
            <Row>
                <Col md={12} style={{ background: '#333A41' }} className="p-0">
                    <div style={{ height: '100vh' }}>
                        <div className="px-3 py-2" style={{ background: '#2A2F32'  }}>
                            <Link to="/" className="btn btn-outline-info fw-bold d-flex align-items-center d-inline-flex">
                            <BsFillCaretLeftFill />Inicio
                            </Link>
                        </div>
                        <h3 className="text-white text-center mt-5">Messages per user</h3>
                        <ResponsiveContainer width="100%" height="60%" className="mt-5">
                            <BarChart
                                width={500}
                                height={300}
                                data={countMessages}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="4 4" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="messages" fill="#8884d8" />
                            </BarChart>
                    </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
