import React from 'react'
import { useSelector } from 'react-redux';
import { cutName } from '../../helpers/cutName';

export const HeaderAside = () => {

    const { name, picture } = useSelector(state => state.auth);

    return (
        <div>
            {picture 
            ? <img src={picture} alt={name} className="ms-3 mr-10 img-topbar"/>
            : <img src="./assets/default-user.png" alt={name} className="ms-3 mr-10 img-topbar"/>
            }
            <span className="fw-bold text-white">
                {cutName(name)}
                <i className="fas fa-circle mx-2 text-online"></i>
            </span>
        </div>
    )
}
