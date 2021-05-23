import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

     //Validación del formulario
     const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .required( true )
                    .min(3, true),
            email: Yup.string()
                    .email( true )
                    .required( true ),
            password: Yup.string()
                    .required( true )
                    .min(8, true)
        }),
        onSubmit : (values) => {

            const { name, email, password } = values;
           
            dispatch( startRegister(name, email, password) );
        }   
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Chat | Register</title>
                <meta name="description" content="Registro de nuevo usuario" />
            </Helmet>

            <Container fluid className="bg-dark d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
                
                <div style={{ width: '300px' }}>
                    <Form onSubmit={formik.handleSubmit} className="animate__animated animate__fadeIn">
                        <h2 className="text-white text-start mb-3 texto">ChatRoom</h2>
                        <h4 className="text-white lead mt-3">Registro</h4>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                    autoComplete="off"
                                    name="name"
                                    className="bg-dark text-white" 
                                    type="text" 
                                    placeholder="Nombre" 
                                    value={ formik.values.name }
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                    isInvalid={formik.errors.name}
                                />
                        </Form.Group>
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
                                    isInvalid={formik.errors.email}
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
                                    isInvalid={formik.errors.password}
                                />
                        </Form.Group>
                        <Button type="submit" variant="outline-primary" className="w-100 mt-3">
                            Registrarme
                        </Button>
                        <Link to="/auth/login" className="d-inline-block mt-3">Si ya tienes una cuenta</Link>
                    </Form>
                </div>
            </Container>
        </>
        
    )
}
