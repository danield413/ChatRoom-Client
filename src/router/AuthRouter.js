import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';


export const AuthRouter = () => {
    return (
        <Router>
            <Switch>

                <Route 
                    path="/auth/login"
                    component={LoginScreen}
                />

                <Redirect to="/auth/login" />

            </Switch>
        </Router>
    )
}
