import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../actions/dashboard';

export const Online = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    const { selectedUser } = useSelector(state => state.dashboard);
    const { users } = useSelector(state => state.dashboard);

    return (
        <>
            <h5 className="lead ms-4 my-3"><strong className="text-light">Conectados</strong></h5>
                <button 
                    onClick={ () => dispatch( selectUser({}) )}
                    className={`text-white w-100 text-start animate__animated animate animate__fadeIn user-sidebar ${!selectedUser?.name && !selectedUser?.uid ? 'user-sidebar-active' : ''}`} 
                >
                    <FaUserCircle color="#fff" size="26px" style={{ marginRight: '10px' }} className="ms-3"/>
                    <span className="fw-bold">Sala general <i className="fas fa-circle mx-2" style={{fontSize: '12px', color: '#1DD200'}}></i></span>
                </button>
                <div className="w-100 overflow-auto" style={{ height: '50vh' }}>
                    {users &&
                        users.map(user => (
                            (user?.id !== uid) &&
                                <button 
                                    key={user.id} 
                                    onClick={ () => dispatch( selectUser({ uid: user?.id, name: user?.name }) )}
                                    className={`text-white w-100 text-start animate__animated animate animate__fadeIn user-sidebar ${user.id === selectedUser?.uid ? 'user-sidebar-active' : ''}`} 
                                >
                                    <FaUserCircle color="#fff" size="26px" style={{ marginRight: '10px' }} className="ms-3"/>
                                    <span className="fw-bold">{user.name} <i className="fas fa-circle mx-2" style={{fontSize: '12px', color: '#1DD200'}}></i></span>
                                </button>
                        ))
                    }
                </div>
                    
        </>
    )
}
 