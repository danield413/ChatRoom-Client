import { types } from "../types/types";


export const addMessages = ( payload ) => ({
    type: types.addMessages,
    payload
})

export const addUsers = ( payload ) => ({
    type: types.addUsers,
    payload
})

export const cleanDashboard = () => ({ type: types.cleanDashboard })