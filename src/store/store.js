import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { dashboardReducer } from '../reducers/dashboardReducer';
import { statsReducer } from '../reducers/statsReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    stats: statsReducer
})

export const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware(thunk) )
)