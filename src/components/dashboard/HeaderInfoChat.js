import React from 'react'
import { useSelector } from 'react-redux';

export const HeaderInfoChat = ({ location }) => {

    const { selectedUser } = useSelector(state => state.dashboard);
    
    return (
        <div className="d-flex align-items-center">
            {
                location === 'public' &&
                <>
                    <img src="./assets/img1.jpg" alt="Foto de perfil de grupo" className="ms-3 img-topbar"/>
                    <span className="text-white fw-bold ms-3 text-resp">Chat general</span>
                </>
            }
            {
                location === 'private' && 
                <>
                    {selectedUser.picture !== 'null' 
                        ? <img src={selectedUser.picture} alt={selectedUser.name} className="ms-3  img-topbar"/>
                        : <img src="./assets/default-user.png" alt="default" className="ms-3 img-topbar"/>
                    }
                    <span className="text-white fw-bold ms-3 text-resp">
                        {selectedUser.name} <i className="fas fa-circle mx-2 text-online"></i>
                    </span>
                </>
            }
        </div>
    )
}
