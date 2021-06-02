import React, { useCallback, useEffect, useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { AiTwotoneSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth'
import { cleanDashboard, closeSidebar, selectUser } from '../../actions/dashboard';
import { Online } from './Online';
import { All } from './All';
import { Link } from 'react-router-dom';
import { IoIosStats } from 'react-icons/io';
import { cleanStats } from '../../actions/stats';
import { VscChromeClose } from 'react-icons/vsc';
import { motion } from 'framer-motion';
import { cutName } from '../../helpers/cutName';

export const AsideResponsive = () => {

    const [state, setState] = useState('online')
    const dispatch = useDispatch();
    const { uid, name, picture } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.dashboard);
    const { selectedUser } = useSelector(state => state.dashboard);

    const userLeaves = useCallback(() => {
        const u = users.find( user => user.id === selectedUser?.uid );
        if(!u) {
            dispatch( selectUser({}) )
        }
    }, [users, selectedUser?.uid, dispatch])

    useEffect(() => {
       userLeaves()
    }, [users, userLeaves])
    
    const handleLogout = () => {
        dispatch( logout() );
        dispatch( cleanDashboard() );
        dispatch( cleanStats() );
        localStorage.removeItem('chat-token');
    }

    return (
        <aside className="h-100">
            <header>
                <div className="w-100 bg-dark d-flex justify-content-between align-items-center px-2 header-height">
                    <div>
                        {picture 
                        ? <img src={picture} alt={name} className="ms-3 mr-10 img-topbar"/>
                        : <img src="./assets/default-user.png" alt="default" className="ms-3 mr-10 img-topbar"/>
                        }
                        <span className="fw-bold text-white text-resp">
                            {cutName(name)}
                            <i className="fas fa-circle mx-2 text-online"></i>
                        </span>
                    </div>
                    <div>
                        <DropdownButton title={<AiTwotoneSetting />} id="dropdown-item-button" variant="dark" className="bg-dark d-inline">
                            <Dropdown.ItemText className="bg-secondary text-light text-resp">
                                <strong>Opciones</strong>
                            </Dropdown.ItemText>
                            <Dropdown.Item as="button" onClick={handleLogout} className="bg-secondary text-light text-resp">
                                Salir
                            </Dropdown.Item>
                        </DropdownButton>
                        <motion.button 
                            onClick={() => dispatch( closeSidebar() ) }
                            whileTap={{ scale: 1.4 }}
                            className="sidebar-close"
                        >
                            <VscChromeClose fill="#fff" size="1.4rem"/>
                        </motion.button>
                    </div>
                </div>
            </header>
            <p className="text-muted text-center mt-2">ID: {uid}</p>
            <div className="w-100 d-flex justify-content-center mb-3">
                <Link 
                    className="text-resp link-button px-3 fw-bold"
                    to="/stats"
                    onClick={() => dispatch( closeSidebar() )}
                >
                    <IoIosStats />
                    Estadísticas
                </Link>
            </div>
            <div>
                <ButtonGroup aria-label="selección" className="w-100">
                    <button 
                        onClick={ () => setState('online')} 
                        className={`text-resp button-group w-50 ${state === 'online' && 'button-group-active'} fw-bold text-white`}
                    >
                        Conectados
                    </button>
                    <button 
                        onClick={ () => setState('all')} 
                        className={`text-resp button-group w-50 ${state === 'all' && 'button-group-active'} fw-bold text-white` }
                    >
                        Todos
                    </button>
                </ButtonGroup>
                {( state === 'online' ) 
                ? <Online />
                : <All />
                }
            </div>
        </aside>
    )
}
