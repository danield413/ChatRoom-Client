import { types } from "../types/types";

const initialState = {
    messages: [],
    users: [],
    selectedUser: {},
    chatMessages: []
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
        case types.selectUser: 
            return {
                ...state,
                selectedUser: action.payload
            }
        case types.addChatMessages: 
            return {
                ...state,
                chatMessages: action.payload
            }
        default:
            return state;
    }

}