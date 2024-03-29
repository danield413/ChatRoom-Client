import React, { useCallback, useRef, useState } from 'react'
import { IoIosInformationCircle } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MessageReceived } from '../dashboard/MessageReceived';
import { MessageSent } from '../dashboard/MessageSent';
import { motion } from 'framer-motion';
import { ModalInfo } from './ModalInfo';
import { AiOutlineMenu } from 'react-icons/ai';
import { openSidebar } from '../../actions/dashboard';
import { ChatInput } from './ChatInput';
import { HeaderInfoChat } from './HeaderInfoChat';

export const Chat = ({ sendMessage, showMenuButton }) => {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const textRef = useRef();
    const { messages } = useSelector(state => state.dashboard);
    const { uid } = useSelector(state => state.auth);
    
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
            sendMessage(textRef.current.value);
            textRef.current.value = '';
        }
    }

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <div className="chat w-100">
            <div className="bg-head-chat header-chat">
                
                <HeaderInfoChat location="public" />
            
                <div className="d-flex align-items-center justify-content-end">
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
            <div className="overflow-auto pt-4 bg-chat container-chat">
                {(messages.length === 0) && 
                    <div className="alert alert-warning text-center mx-5 text-resp">Todavía no hay mensajes, comienza escribiendo uno.</div>
                }
                {(messages.length > 0) &&
                    messages.map((message, index) => {
                        const lastMessage = messages.length - 1 === index;
                        if(message.user._id === uid){
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
                                    name={message.user.name}
                                    date={message.date}
                                />
                            </div>
                        }
                    })
                }
            </div>
           
            <ChatInput textRef={textRef} handleSubmit={handleSubmit} />
        </div>
        <ModalInfo handleClose={handleClose} show={show}/>
        </>
    )
}


Chat.propType = {
    sendMessage: PropTypes.func.isRequired,
    showMenuButton: PropTypes.func.isRequired
}