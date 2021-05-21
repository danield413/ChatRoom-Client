import { types } from "../types/types";

const initialState = {
    checking: true,
    newUser: false
}

export const authReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }    

        case types.authLogout:
            return {
                checking: false
            }
            
        case types.authCheckingJWTFinish:
            return {
                ...state,
                checking: false
            }
        case types.newUser: 
            return {
                ...state,
                newUser: true
            }
        default:
            return state;
    }
}