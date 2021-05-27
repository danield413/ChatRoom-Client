import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
import { Spinner } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosInformationCircle, IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addChatMessages, openSidebar } from '../../actions/dashboard';
import { MessageReceived } from '../dashboard/MessageReceived';
import { MessageSent } from '../dashboard/MessageSent';
import { ModalInfo } from './ModalInfo';

export const PrivateChat = ({ sendPrivateMessage, showMenuButton }) => {

    const textRef = useRef();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { selectedUser } = useSelector(state => state.dashboard);
    const { chatMessages } = useSelector(state => state.dashboard);
    const { uid, name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const setRef = useCallback( node => {
        if( node ) {
            node.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(textRef.current.value === ''){
            textRef.current.value = '';
        } else {
            sendPrivateMessage(textRef.current.value);
            textRef.current.value = '';
        }
    }

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        //Solo si hay un usuario (chat) seleccionado
        if(selectedUser?.uid) {
            setLoading(true)
            axios.get(`${process.env.REACT_APP_API_URL}/messages/get-all-chat/${uid}/${selectedUser?.uid}`, {
                headers: {
                    'x-token': localStorage.getItem('chat-token'),
                    'Content-Type': 'application/json'
                }
            })
            .then( ( {data} ) => {
                setLoading(false)
                dispatch( addChatMessages(data.messagesChat) )
            }) 
            .catch( err => {
                Swal.fire('UPS, hubo un error cargando el chat');
            })
        }
    }, [selectedUser?.uid, selectedUser?.name, uid, dispatch]); 

    return (
        <>
        <div className="chat w-100">
            <div className="py-2 d-flex align-items-center justify-content-between bg-head-chat">
                <div>
                    <span className="text-white fw-bold ms-3 text-resp">
                        <FaUserCircle color="#fff" size="26px" className="mr-10"/>
                        {selectedUser.name}</span>
                </div>
                <div>
                    <motion.button 
                        onClick={handleOpen}
                        whileTap={ {scale: 2.5} }
                        className="button-info mr-1rem"
                    >
                        <IoIosInformationCircle />
                    </motion.button>
                    {showMenuButton && 
                    <motion.button
                            onClick={() => dispatch( openSidebar() )}
                            whileTap={ {scale: 2.5} }
                            className="button-info mr-1rem"
                        >
                        <AiOutlineMenu />
                    </motion.button>
                    }
                    
                </div>
            </div>
            <div className="overflow-auto pt-4 bg-chat chat-container">
            
            {(loading) &&
                <div className="w-100 d-flex justify-content-center">
                    <Spinner animation="border" role="status" variant="primary" />
                </div>
            }
            {(chatMessages && !loading && chatMessages.length === 0) &&
                <div className="alert alert-warning text-center text-resp mx-alert">
                    Aún no tienes mensajes con <strong>{selectedUser?.name}.</strong>
                </div>
            }
            {chatMessages &&
                    chatMessages.map((message, index) => {
                        const lastMessage = chatMessages.length - 1 === index;
                        if(message.recipient !== uid){
                            return <div key={index} className="d-flex w-100 align-items-end flex-column" ref={lastMessage ? setRef : null}>
                                <MessageSent 
                                    key={index} 
                                    text={message.message}
                                    date={message.date}
                                />
                            </div>
                        } else {
                            return <div key={index} className="d-flex w-100 align-items-start flex-column" ref={lastMessage ? setRef : null}>
                                <MessageReceived 
                                    key={index} 
                                    text={message.message} 
                                    date={message.date}
                                />
                            </div>
                        }
                    })
                }
            </div>
           
            <div id="chat-input">
                <form onSubmit={handleSubmit} className="h-100 d-flex align-items-center">
                    <input ref={textRef} type="text" className="w-100" id="message-input" placeholder="Escribe un mensaje" autoComplete="off"/>
                    <button type="submit" id="message-submit" className="bg-primary">
                        <IoMdSend color="#fff"/>
                    </button>
                </form>
            </div>
        </div>
        <ModalInfo 
            handleClose={handleClose} 
            show={show}
            participants={[name, selectedUser?.name]}
        />
        </>
    )
}
