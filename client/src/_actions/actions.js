//Firebase
import {auth} from "../firebase";
// Type actions
import {LOGOUT, LOGGER_IN_USER} from "../actionsType";

export const userLogOutFirebase = () => dispatch => {
    auth.signOut()
    dispatch({
        type: LOGOUT,
        payload: {}
    });
}

export const userLogInFirebase = (id, name, email, token, role, picture) => dispatch => {
    return dispatch({
        type: LOGGER_IN_USER,
        payload: {
            id,
            name,
            email,
            token,
            role,
            picture
        }
    })
}