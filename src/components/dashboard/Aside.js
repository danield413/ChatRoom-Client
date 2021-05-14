import React from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { AiTwotoneSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth'
import { cleanDashboard } from '../../actions/dashboard';
import { Link } from 'react-router-dom';

export const Aside = () => {

    const { uid, name } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.dashboard)
    
    const handleLogout = () => {
        dispatch( logout() );
        dispatch( cleanDashboard() );
        localStorage.removeItem('chat-token');
    }

    return (
        <aside className="h-100 pb-2">
            <div className="w-100 bg-dark d-flex justify-content-between align-items-center px-2" style={{ height: '50px' }}>
                <div>
                    <FaUserCircle color="#fff" size="26px" style={{ marginRight: '10px' }} className="ms-3"/>
                    <span className="fw-bold text-white">{name}</span>
                </div>
                <DropdownButton title={<AiTwotoneSetting />} id="dropdown-item-button" variant="dark">
                    <Dropdown.ItemText><strong>Opciones</strong></Dropdown.ItemText>
                    <Dropdown.Item as="button" onClick={handleLogout}>Salir</Dropdown.Item>
                </DropdownButton>
            </div>
            <p className="text-muted text-center mt-2">{uid}</p>
            <div className="w-100 px-3">
                <Link to="/stats" className="btn btn-outline-info mb-3 w-100">Ver estadisticas</Link>
                <h5 className="lead"><strong className="text-light">Conectados</strong></h5>
                
                    {users &&
                        users.map(user => (
                            <Button key={user.id} className="text-white my-2 w-100 text-start animate__animated animate animate__bounceIn" variant="outline-primary">
                                <i className="fas fa-circle mx-2" style={{fontSize: '12px', color: '#1DD200'}}></i>
                                <span>{user.name}</span>
                            </Button>
                        ))
                    } 
            </div>
        </aside>
    )
}
