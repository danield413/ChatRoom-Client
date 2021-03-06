import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Aside } from './Aside';
import { AsideResponsive } from './AsideResponsive';
import { Chat } from './Chat';
import { selectUser } from '../../actions/dashboard';
import { PrivateChat } from './PrivateChat';
import { useSocket } from '../../context/SocketProvider';
import { Helmet } from 'react-helmet';


export const DashboardScreen = () => {

    const { name } = useSelector(state => state.auth);
    const [width, setWidth] = useState(window.screen.width);
    const { selectedUser, showSidebar } = useSelector(state => state.dashboard);
    const {sendMessage, sendPrivateMessage} = useSocket();

    useEffect(() => {

        const windowResize = (e) => {
            setWidth(e.target.innerWidth)
        }
        
        window.addEventListener('resize', windowResize )

        return () => window.removeEventListener('resize', windowResize)

    }, [])
    
    return (  
        <>
            <Helmet>
                <title>{ name } | ChatRoom</title>
                <meta name="description" content="Contenido principal del usuario y salas de chat" />
            </Helmet>
            
            <main>
                <div id="container-grid">

                    {width > 900 &&
                    <div className="p-0 aside-color">
                        <Aside /> 
                    </div>
                    }

                    {width <= 900 &&
                    <div className={`p-0 aside-color aside-responsive ${showSidebar && 'aside-responsive-show'}`}>
                        <AsideResponsive />
                    </div>
                    }


                    <div className="p-0 d-flex">
                        <div className="d-flex column-chat-dimensions" id="chat">
                            {selectedUser?.uid && selectUser?.name 
                            ? <PrivateChat 
                                sendPrivateMessage={sendPrivateMessage} 
                                showMenuButton={ width < 900 ? true : false } 
                            />
                            : <Chat 
                                sendMessage={sendMessage} 
                                showMenuButton={ width < 900 ? true : false }
                            />
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
        
    )
}
