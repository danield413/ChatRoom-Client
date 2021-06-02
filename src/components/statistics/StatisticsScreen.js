import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import {Helmet} from "react-helmet";

export const StatisticsScreen = () => {

    const {countMessages} = useSelector(state => state.stats)

    return (
        <>
            <Helmet>
                <title>Stats | ChatRoom</title>
                <meta name="description" content="Estadisticas del chat general" />
            </Helmet>

            <Container fluid>
                <Row>
                    <Col md={12} className="p-0 bg-dark">
                        <div className="container-full">
                            <div className="px-3 py-2 bg-head-chat header-stats">
                            <Link 
                                className="text-resp link-button px-3 fw-bold"
                                to="/"
                            >
                                <BsFillCaretLeftFill /> Inicio
                            </Link>
                            </div>
                            <h3 className="text-resp text-white text-center mt-5">Usuarios que más mensajes han enviado</h3>
                            <h4 className="text-resp text-info text-center mb-5">En el chat general</h4>
                            <ResponsiveContainer width="90%" height="50%" className="text-resp">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={countMessages}
                                    margin={{
                                        top: 5,
                                        right: 5,
                                        left: 5,
                                        bottom: 5,
                                    }}
                                >
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
        </>
    )
}
