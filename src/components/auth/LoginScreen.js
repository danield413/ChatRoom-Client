import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startLogin } from '../../actions/auth';


export const LoginScreen = () => {

    const dispatch = useDispatch();

     //Validación del formulario
     const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .email( true )
                    .required( true ),
            password: Yup.string()
                    .required( true )
                    .min(8, true)
        }),
        onSubmit : (values) => {

            const { email, password } = values;
           
            dispatch( startLogin(email, password) );
        }   
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Chat | Login</title>
                <meta name="description" content="Inicio de sesión" />
            </Helmet>

            <Container fluid className="bg-dark d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div style={{ width: '300px' }}>
                    <Form onSubmit={formik.handleSubmit} className="animate__animated animate__fadeIn">
                        <h2 className="text-white text-start mb-3 texto">ChatRoom</h2>
                        <h4 className="text-white lead">Inicio de sesión</h4>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                autoComplete="off"
                                name="email"
                                className="bg-dark text-white" 
                                type="email" 
                                placeholder="Correo" 
                                value={ formik.values.email }
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                isInvalid={ formik.errors.email }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                name="password"
                                className="bg-dark text-white" 
                                type="password" 
                                placeholder="Contraseña" 
                                value={ formik.values.password }
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                isInvalid={ formik.errors.password }
                            />
                        </Form.Group>
                        <Button type="submit" variant="outline-primary" className="w-100 mt-3">
                            Ingresar
                        </Button>
                        <Link to="/auth/register" className="d-inline-block mt-3">Si no tienes una cuenta</Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}
