import axios from "axios";
import { types } from "../types/types";
import Swal from 'sweetalert2'

export const startLogin = ( email, password ) => {
    return async(dispatch) => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            email, password
        })

        if(data.ok){
            localStorage.setItem('chat-token', data.token);

            dispatch( login({
                uid: data.user.uid,
                name: data.user.name,
                email: data.user.email
            }))
        }
    }
}

const login = ( data ) => ({
    type: types.authLogin,
    payload: data
});

export const startRegister = ( name, email, password ) => {
    return async(dispatch) => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
            name, email, password
        });

        if(data.ok) {
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Cuenta creada',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/auth/renew`,{
            headers: {
                'x-token': localStorage.getItem('chat-token'),
                'Content-Type': 'application/json'
            }
        });

        if(data.ok) {
            localStorage.setItem('chat-token', data.token);

            dispatch( login({
                uid: data.user.uid,
                name: data.user.name,
                email: data.user.email
            }))
        } else {
            dispatch( checkingFinish() )
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingJWTFinish })

export const logout = () => ({type: types.authLogout})
