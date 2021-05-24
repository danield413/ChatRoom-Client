import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const All = () => {

    const { allUsers } = useSelector(state => state.dashboard);
    const { uid } = useSelector(state => state.auth);

    return (
        <>
            <h5 className="lead ms-4 my-3"><strong className="text-light">Todos</strong></h5>
            <div className="w-100 overflow-auto all-height">
            {allUsers &&
                allUsers.map(user => (
                    (user?.id !== uid) &&
                        <button 
                            key={user.uid} 
                            className="text-white w-100 text-start animate__animated animate animate__fadeIn user-sidebar" 
                        >
                            <FaUserCircle color="#fff" size="26px" className="ms-3 mr-10"/>
                            <span className="fw-bold">{user.name}</span>
                        </button>
                ))
            }
            </div>
        </>
    )
}
