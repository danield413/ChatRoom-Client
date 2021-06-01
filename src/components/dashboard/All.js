import React from 'react'
import { useSelector } from 'react-redux'

export const All = () => {

    const { allUsers } = useSelector(state => state.dashboard);
    const { uid } = useSelector(state => state.auth);

    return (
        <>
            <h5 className="lead ms-4 my-3"><strong className="text-light text-resp">Todos</strong></h5>
            <div className="w-100 overflow-auto all-height">
            {allUsers &&
                allUsers.map(user => (
                    (user?.id !== uid) &&
                        <button 
                            key={user.uid} 
                            className="text-white w-100 text-start animate__animated animate animate__fadeIn user-sidebar" 
                        >
                            {user.picture 
                                ? <img src={user?.picture} alt={user?.name} className="ms-3 mr-10 img-topbar"/>
                                : <img src="./assets/default-user.png" alt="default" className="ms-3 mr-10 img-topbar"/>
                            }
                            <span className="fw-bold">{user.name}</span>
                        </button>
                ))
            }
            </div>
        </>
    )
}
