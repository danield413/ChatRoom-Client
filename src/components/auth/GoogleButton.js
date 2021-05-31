import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { motion } from 'framer-motion';

export const GoogleButton = () => {

    const dispatch = useDispatch();
    
    const clientId = '257430794857-ifhr62u2i59t0snq8a3q4gns6k8or9a6.apps.googleusercontent.com';
    
    const url = ( window.location.hostname.includes('localhost') )
                ? 'http://localhost:5000/api/auth/google'
                : 'https://room-chat-dan.herokuapp.com/api/auth/google'

    const doFetch = async (id_token) => {
        const data = { id_token }
        fetch( url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( ({uid, name, email, google, token}) => {
            dispatch( login({uid, name, email, google}) );
            localStorage.setItem('chat-token', token)
        })
        .catch( console.log )
    }

    const onSuccess = async (res) => {
        const {tokenId} = res;
        await doFetch(tokenId);
    }

    const onFailure = (res) => {
        console.log('Login failed =>', res);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Iniciar sesión con Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                className="mt-3 w-100 text-center"
                render={renderProps => (
                    <motion.div 
                        whileTap={{ scale: 1.1 }}
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                        className="google-btn"
                    >
                        <div className="logo">
                            <FcGoogle size="1.7rem"/>
                        </div>
                        <div className="l-text">Ingresar con Google</div>
                    </motion.div>
                )}
            />
        </div>
    )
}
