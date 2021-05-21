import React, { useCallback, useEffect, useState } from 'react'
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { AiTwotoneSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth'
import { cleanDashboard, selectUser } from '../../actions/dashboard';
import { Online } from './Online';
import { All } from './All';
import { Link } from 'react-router-dom';
import { IoIosStats } from 'react-icons/io';

export const Aside = () => {

    const [state, setState] = useState('online')
    const dispatch = useDispatch();
    const { uid, name } = useSelector(state => state.auth);
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
        localStorage.removeItem('chat-token');
    }

    return (
        <aside className="h-100">
            <header>
                <div className="w-100 bg-dark d-flex justify-content-between align-items-center px-2" style={{ height: '60px' }}>
                    <div>
                        <FaUserCircle color="#fff" size="26px" style={{ marginRight: '10px' }} className="ms-3"/>
                        <span className="fw-bold text-white">{name}</span>
                    </div>
                    <DropdownButton title={<AiTwotoneSetting />} id="dropdown-item-button" variant="dark" className="bg-dark">
                        <Dropdown.ItemText className="bg-secondary text-light">
                            <strong>Opciones</strong>
                        </Dropdown.ItemText>
                        <Dropdown.Item as="button" onClick={handleLogout} className="bg-secondary text-light">
                            Salir
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            </header>
            <p className="text-muted text-center mt-2">{uid}</p>
            <div className="w-100 d-flex justify-content-center mb-3">
                <Link to="/stats" className="btn btn-outline-info d-flex align-items-center"><IoIosStats className="me-1"/>Estadísticas</Link>
            </div>
            <div>
                <ButtonGroup aria-label="selección" className="w-100">
                    <button 
                        onClick={ () => setState('online')} 
                        className={`button-group ${state === 'online' && 'button-group-active'} fw-bold text-white`}
                        style={{ width: '50%' }}
                    >
                        Conectados
                    </button>
                    <button 
                        onClick={ () => setState('all')} 
                        className={`button-group ${state === 'all' && 'button-group-active'} fw-bold text-white` }
                        style={{ width: '50%' }}
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
