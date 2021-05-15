import { types } from "../types/types";


export const addMessages = ( payload ) => ({
    type: types.addMessages,
    payload
})

export const addChatMessages = (payload) => ({
    type: types.addChatMessages,
    payload
})

export const addUsers = ( payload ) => ({
    type: types.addUsers,
    payload
})

export const selectUser = ( payload ) => ({
    type: types.selectUser,
    payload
})

export const cleanDashboard = () => ({ type: types.cleanDashboard })