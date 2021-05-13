import React, { useCallback, useRef } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useSocket } from '../contexts/SocketProvider';
import { MessageReceived } from './MessageReceived';
import { MessageSent } from './MessageSent';

export const Chat = ({ id, name }) => {

    const textRef = useRef();
    const { messages, sendMessage } = useSocket();
    // const listHeader = listUsers();
    const setRef = useCallback( node => {
        if( node ) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        if(textRef.current.value === ''){
            textRef.current.value = '';
        } else {
            sendMessage(textRef.current.value, name);
            textRef.current.value = '';
        }
    }

    return (
        <div className="chat w-100">
            
            <div className="chat-messages bg-dark overflow-auto">
                {messages &&
                            messages.map((message, index) => {
                                const lastMessage = messages.length - 1 === index;
                                if(message.from === id){
                                    return <div key={index} className="d-flex w-100 align-items-end flex-column" ref={lastMessage ? setRef : null}>
                                        <MessageSent key={index} text={message.message}/>
                                    </div>
                                } else {
                                    return <div key={index} className="d-flex w-100 align-items-start flex-column" ref={lastMessage ? setRef : null}>
                                        <MessageReceived key={index} text={message.message} name={message.fromName}/>
                                    </div>
                                }
                            })
                }
            </div>
           
            <div id="chat-input" style={{ height: '100%', width: '100%', padding: '0 150px', background: '#2A2F32' }}>
                <form onSubmit={handleSubmit} className="h-100 d-flex align-items-center">
                    <input ref={textRef} type="text" className="w-100" id="message-input" placeholder="Escribe un mensaje" autoComplete="off"/>
                    <button type="submit" id="message-submit" className="bg-primary"><IoMdSend color="#fff"/></button>
                </form>
            </div>
        </div>
    )
}
