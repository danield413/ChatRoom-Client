import React, { useState, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { MdDone } from 'react-icons/md';
// import { motion } from 'framer-motion';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;

        const validation = /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:\s@”]{2,})$/;
        
        if (validation.test(email) && password.length >= 8 && name.length > 0) {
            
            dispatch( startRegister(name, email, password) );
            nameRef.current.value = '';
            emailRef.current.value = '';
            passwordRef.current.value = '';

        } else if (email.length === 0 || password.length < 6 || name.length === 0) {
            setError(true);
        } else {
            setError(true);
        }
    }

    return (
        <Container fluid className="bg-dark d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div style={{ width: '300px' }}>
                <Form onSubmit={handleSubmit} className="animate__animated animate__fadeIn">
                    <h2 className="text-white text-start mb-3 texto">ChatRoom</h2>
                    {/* <motion.div 
                        animate={{
                            scale: [1, 1.1, 1.1, 1],
                            rotate: [0, 360, 0],
                            borderRadius: ["15px", "50%", "40%", "50%px"]
                        }}
                        className="px-3 py-3 d-flex align-items-center justify-content-center animate__animated animate__" style={{ height: '60px', width: '60px', border: '2px solid #4AC95D', color: '#4AC95D', margin: '0 auto'}}
                    >
                        <MdDone size="30px"/>
                    </motion.div> */}
                    <h4 className="text-white lead mt-3">Registro</h4>
                    <Form.Group className="mb-3">
                        <Form.Control className="bg-dark text-white" type="text" placeholder="Nombre" ref={nameRef} isInvalid={error}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control className="bg-dark text-white" type="email" placeholder="Correo" ref={emailRef} isInvalid={error}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className="bg-dark text-white" type="password" placeholder="Contraseña" ref={passwordRef} isInvalid={error}/>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="w-100 mt-3">
                        Registrarme
                    </Button>
                    <Link to="/auth/login" className="d-inline-block mt-3">Si ya tienes una cuenta</Link>
                </Form>
            </div>
        </Container>
    )
}
