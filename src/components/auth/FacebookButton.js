import React from 'react'
import FacebookLogin from 'react-facebook-login';

export const FacebookButton = () => {

    const responseFacebook = (res) => {
        console.log(res);
    }

    return (
        <div>
            <FacebookLogin
                appId="2938651369744447"
                fields="name,email,picture"
                callback={responseFacebook}
            />
        </div>
    )
}
