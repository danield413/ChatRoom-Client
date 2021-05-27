import { types } from "../types/types";

export const setStats = (payload) => ({
    type: types.loadStats,
    payload
})

export const cleanStats = () => ({ type: types.cleanStats })