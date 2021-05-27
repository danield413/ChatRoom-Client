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

export const addAllUsers = ( payload ) => ({
    type: types.addAllUsers,
    payload
})

export const openSidebar = () => ({ type: types.openSidebar })
export const closeSidebar = () => ({ type: types.closeSidebar })

export const cleanDashboard = () => ({ type: types.cleanDashboard })