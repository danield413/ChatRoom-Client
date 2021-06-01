import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, selectUser } from '../../actions/dashboard';

export const Online = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    const { selectedUser } = useSelector(state => state.dashboard);
    const { users } = useSelector(state => state.dashboard);
    
    return (
        <>
            <h6 className="lead ms-4 my-3 "><strong className="text-light text-resp">Conectados</strong></h6>
                <button 
                    onClick={ () => {
                        dispatch( selectUser({}) )
                        dispatch( closeSidebar() )
                    }}
                    className={`text-white w-100 text-start animate__animated animate animate__fadeIn user-sidebar ${!selectedUser?.name && !selectedUser?.uid ? 'user-sidebar-active' : ''}`} 
                >
                    <img src="./assets/img1.jpg" alt="default" className="ms-3 mr-10 img-topbar"/>
                    <span className="fw-bold text-resp">Chat general <i className="fas fa-circle mx-2 fz-12px text-online" ></i></span>
                </button>
                <div className="w-100 overflow-auto online-height">
                    {users &&
                        users.map(user => (
                            (user?.id !== uid) &&
                                <button 
                                    key={user.id} 
                                    onClick={ () => {
                                        dispatch( selectUser({ uid: user?.id, name: user?.name, picture: user?.picture }) )
                                        dispatch( closeSidebar() )
                                    } }
                                    className={`text-resp text-white w-100 text-start animate__animated animate animate__fadeIn user-sidebar ${user.id === selectedUser?.uid ? 'user-sidebar-active' : ''}`} 
                                >
                                    {user.picture !== 'null' 
                                        ? <img src={user.picture} alt={user.name} className="ms-3 mr-10 img-topbar"/>
                                        : <img src="./assets/default-user.png" alt="default" className="ms-3 mr-10 img-topbar"/>
                                    }
                                    <span className="fw-bold text-resp">{user.name} <i className="fas fa-circle mx-2 fz-12px text-online"></i></span>
                                </button>
                        ))
                    }
                </div>
                    
        </>
    )
}
 