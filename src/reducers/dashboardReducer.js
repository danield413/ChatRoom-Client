import { types } from "../types/types";

const initialState = {
    messages: [],
    users: [],
    selectedUser: {},
    chatMessages: [],
    allUsers: [],
}

export const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.addMessages:
            return {
                ...state,
                messages: action?.payload ? action.payload : []
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
        case types.addAllUsers: 
            return {
                ...state,
                allUsers: action.payload
            }
        case types.openSidebar: 
            return {
                ...state,
                showSidebar: true
            }
        case types.closeSidebar: 
            return {
                ...state,
                showSidebar: false
            }
        default:
            return state;
    }

}