import React from 'react'
import { GoogleLogout } from 'react-google-login'

export const GoogleLogoutButton = () => {

    const clientId = '257430794857-ifhr62u2i59t0snq8a3q4gns6k8or9a6.apps.googleusercontent.com';
    
    const onSuccess = () => {
        alert('Sesión cerrada 😎');
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Cerrar sesión de Google"
                onLogoutSuccess={onSuccess}
                className="w-100 mt-2"
            ></GoogleLogout>
        </div>
    )
}
