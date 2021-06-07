import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/dashboard';
import { IoIosStats } from 'react-icons/io';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { useHistory } from "react-router-dom";

const LinkBtn = styled.a`
    border: 2px solid cyan;
    background-color: transparent;
    color: cyan;
    padding: 5px 10px;
    border-radius: 5px;
    transition: 0.2s ease-in;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: cyan;
        color: black;
    }
`

export const LinkButton = ({to, text}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const redirect = () => {
        history.push( to );
    }

    return (
        <LinkBtn
            className="text-resp link-button px-3 fw-bold"
            onClick={() => {
                dispatch(closeSidebar())
                redirect()
            }}
        >
            {text === 'Estadísticas'
            ? <IoIosStats />
            : <BsFillCaretLeftFill />
            }
            {text}
        </LinkBtn>
    )
}
