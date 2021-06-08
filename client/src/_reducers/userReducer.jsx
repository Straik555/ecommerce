//ACTIONS
import {
    IS_LOADING,
    LOGGER_IN_USER,
    LOGOUT
} from "../actionsType";


const initialState = {
    user: {},
    isLogin: false,
    isLoading: false,
    error: null
}

const userReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case LOGGER_IN_USER:
            return {
                user: payload,
                isLogin: true,
                isLoading: false,
                error: null
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}

export default userReducer;