import React from 'react'
import PropTypes from 'prop-types';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';

const WrapperInput = styled.div`
    height: 60px;
    width: 100%; 
    padding: 0 10%; 
    background: var(--input-chat);
`;

const MessageInput = styled.input`
    height: 65%;
    border: 1px solid transparent;
    outline: none;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: 10px;
    background: rgb(27, 27, 27);
    color: white;
    transition: 0.3s ease;

    &:focus {
        border: 1px solid var(--bs-primary);
    }
`;

const MessageSubmit = styled.button`
    border: none;
    cursor: pointer;
    height: 65%;
    padding: 0 15px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: var(--bs-primary);
    transition: 0.3s ease;

    &:hover: {
        background-color: #0f3d81;
    }
`;

export const ChatInput = ({handleSubmit, textRef}) => {
    return (
        <WrapperInput >
            <form onSubmit={handleSubmit} className="h-100 d-flex align-items-center">
                <MessageInput ref={textRef} type="text" className="w-100" placeholder="Escribe un mensaje" autoComplete="off"/>
                <MessageSubmit type="submit" className="bg-primary">
                    <IoMdSend color="#fff"/>
                </MessageSubmit>
            </form>
        </WrapperInput>
    )
}

ChatInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    textRef: PropTypes.object.isRequired,
}