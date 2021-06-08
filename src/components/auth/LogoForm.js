import React from 'react'
import styled from 'styled-components';
import { FaUserAstronaut } from 'react-icons/fa';

const Link = styled.a`
    text-decoration: none;
    color: rgb(108, 117, 125);
`;

export const LogoForm = ({text}) => {
    return (
        <>
            <h2 className="text-white text-start texto mb-0 animate__animated animate__rubberBand">ChatRoom</h2>
            <p className="text-muted text-end">por <Link href="https://github.com/danield413" target="_blank"><strong>Daniel Díaz <FaUserAstronaut /></strong></Link></p> 
            <h4 className="text-white lead">{text}</h4>
        </>
    )
}
