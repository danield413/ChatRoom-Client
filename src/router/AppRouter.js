import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from '../actions/auth';

import { DashboardScreen } from '../components/dashboard/DashboardScreen';
import { StatisticsScreen } from '../components/statistics/StatisticsScreen';
import { SocketProvider } from '../context/SocketProvider';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth);

    //se verifica el token cada vez que se renderiza de nuevo el AppRouter
    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch]);

    if( checking ) {
        return(
            <div className="flexible">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        )
    }

    return (
        <SocketProvider>
             <Router>
                <Switch>

                    <PublicRoute 
                        isAuthenticated={!!uid}
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <PrivateRoute 
                        isAuthenticated={!!uid}
                        exact
                        path="/" 
                        component={ DashboardScreen }
                    />

                    <PrivateRoute
                        isAuthenticated={!!uid}
                        path="/stats"
                        component={ StatisticsScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </Router>
        </SocketProvider>
    )
}
