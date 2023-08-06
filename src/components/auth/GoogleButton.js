import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
    height: 42px;
    margin-top: 1rem;
    background-color: #4285F4;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    display: grid;
    grid-template-columns: 20% 80%;
    transition: 0.2s ease;

    &:hover {
        background: #366fca;
    }
`;
const Logo = styled.div`
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;
const Text = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const GoogleButton = () => {

    const dispatch = useDispatch();
    
    const clientId = '257430794857-ifhr62u2i59t0snq8a3q4gns6k8or9a6.apps.googleusercontent.com';

    const url = ( window.location.hostname.includes('localhost') )
                ? 'http://localhost:8080/api/auth/google'
                : 'https://chatroom-server-gcuo-dev.fl0.io/api/auth/google'

    const doFetch = async (id_token) => {
        const data = { id_token }
        fetch( url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then( res => res.json() )
        .then( ({uid, name, email, google, picture, token}) => {
            dispatch( login({uid, name, email, google, picture}) );
            localStorage.setItem('chat-token', token)
        })
        .catch( console.log )
    }

    const onSuccess = async (res) => {
        const {tokenId} = res;
        console.log(tokenId)
        await doFetch(tokenId);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                className="mt-3 w-100 text-center"
                render={renderProps => (
                    // <motion.div 
                    //     whileTap={{ scale: 1.1 }}
                    //     onClick={renderProps.onClick} 
                    //     disabled={renderProps.disabled}
                    //     className="google-btn"
                    // >
                    //     <div className="logo">
                    //         <FcGoogle size="1.7rem"/>
                    //     </div>
                    //     <div className="l-text">Ingresar con Google</div>
                    // </motion.div>
                    <Div 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled}
                    >
                        <Logo>
                             <FcGoogle size="1.7rem"/>
                         </Logo>
                         <Text>Ingresar con Google</Text>
                    </Div>
                )}
            />
        </div>
    )
}
