import { types } from "../types/types";

const initialState = {
    countMessages: []
}

export const statsReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.loadStats:
            return {
                ...state,
                countMessages: action.payload
            }
        default:
            return state;
    }

}