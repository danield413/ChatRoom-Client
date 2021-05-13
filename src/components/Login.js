import React, { useState } from 'react'
import { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';


export const Login = ({ idSubmit }) => {

    const nameRef = useRef();
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if( nameRef.current.value.length === 0 || nameRef.current.value.length < 4 ) {
            setError(true);
            return;
        } else {
            setError(false);
            const uid = uuidv4();
            idSubmit({ uid, name: nameRef.current.value });
        }
        
    }

    return (
        <Container fluid className="bg-dark d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div style={{ width: '300px' }}>
                <Form onSubmit={handleSubmit}>
                    <h2 className="text-white text-center mb-5">Chat Room</h2>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Nombre" ref={nameRef} isInvalid={error}/>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="w-100 mt-3">
                        Ingresar
                    </Button>
                </Form>
            </div>
        </Container>
    )
}
