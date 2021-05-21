import React, { useCallback, useRef } from 'react'
import { Spinner } from 'react-bootstrap';
import { IoMdSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { MessageReceived } from '../dashboard/MessageReceived';
import { MessageSent } from '../dashboard/MessageSent';

export const PrivateChat = ({ sendPrivateMessage }) => {

    const textRef = useRef();
    const { selectedUser } = useSelector(state => state.dashboard);
    const { chatMessages } = useSelector(state => state.dashboard);
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
            sendPrivateMessage(textRef.current.value);
            textRef.current.value = '';
        }
    }

    return (
        <div className="chat w-100">
            <div className="py-2 d-flex align-items-center" style={{ background: '#2A2F32' }}>
                <span className="text-white fw-bold ms-3">{selectedUser.name}</span>
            </div>
            <div className="chat-messages overflow-auto pt-4" style={{ background: '#333A41' }}>
            {(chatMessages.length === 0) && 
                <div className="alert alert-warning text-center mx-5">Todavía no hay mensajes, comienza escribiendole un mensaje a {selectedUser?.name}.</div>
            }
            {(chatMessages.length === 0) &&
                <div className="w-100 d-flex justify-content-center">
                    <Spinner animation="border" role="status" variant="primary" />
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
           
            <div id="chat-input" style={{ height: '100%', width: '100%', padding: '0 150px', background: '#2A2F32' }}>
                <form onSubmit={handleSubmit} className="h-100 d-flex align-items-center">
                    <input ref={textRef} type="text" className="w-100" id="message-input" placeholder="Escribe un mensaje" autoComplete="off"/>
                    <button type="submit" id="message-submit" className="bg-primary">
                        <IoMdSend color="#fff"/>
                    </button>
                </form>
            </div>
        </div>
    )
}
