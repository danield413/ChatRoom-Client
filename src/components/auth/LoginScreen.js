import React, { useState, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';


export const LoginScreen = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const validation = /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:\s@”]{2,})$/;
        
        if (validation.test(email) && password.length >= 8) {
            
            dispatch( startLogin(email, password) );

        } else if (email.length === 0 || password.length < 6) {
            setError(true);
        } else {
            setError(true);
        }
        
    }

    return (
        <Container fluid className="bg-dark d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div style={{ width: '300px' }}>
                <Form onSubmit={handleSubmit}>
                    <h2 className="text-white text-center mb-5">Chat Room</h2>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Correo" ref={emailRef} isInvalid={error}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder="Contraseña" ref={passwordRef} isInvalid={error}/>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="w-100 mt-3">
                        Ingresar
                    </Button>
                </Form>
            </div>
        </Container>
    )
}
