import { types } from "../types/types";

const initialState = {
    messages: [],
    users: []
}

export const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.addMessages:
            return {
                ...state,
                messages: action.payload
            }
        case types.addUsers:
            return {
                ...state,
                users: action.payload
            }
        case types.cleanDashboard: 
            return {
                messages: [],
                users: []
            }
        default:
            return state;
    }

}