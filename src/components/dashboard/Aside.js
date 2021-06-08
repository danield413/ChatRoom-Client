import React, { useCallback, useEffect, useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { AiTwotoneSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth'
import { cleanDashboard, selectUser } from '../../actions/dashboard';
import { Online } from './Online';
import { All } from './All';
import { cleanStats } from '../../actions/stats';
import { HeaderAside } from './HeaderAside';
import { AsideInfo } from './AsideInfo';

export const Aside = () => {

    const [state, setState] = useState('online')
    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
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
                   
                   <HeaderAside />
                    
                    <DropdownButton title={<AiTwotoneSetting />} id="dropdown-item-button" variant="dark" className="bg-dark d-inline">
                        <Dropdown.ItemText className="bg-secondary text-light">
                            <strong>Opciones</strong>
                        </Dropdown.ItemText>
                        <Dropdown.Item as="button" onClick={handleLogout} className="bg-secondary text-light">
                            Salir
                        </Dropdown.Item>
                    </DropdownButton>
                        
                </div>
            </header>

            <AsideInfo uid={uid} />
            
            <div>
                <ButtonGroup aria-label="selección" className="w-100">
                    <button 
                        onClick={ () => setState('online')} 
                        className={`button-group w-50 text-resp ${state === 'online' && 'button-group-active'} fw-bold text-white`}
                    >
                        Conectados
                    </button>
                    <button 
                        onClick={ () => setState('all')} 
                        className={`button-group w-50 text-resp ${state === 'all' && 'button-group-active'} fw-bold text-white` }
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
