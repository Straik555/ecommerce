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

export const userLogInFirebase = (user, idTokenResult) => dispatch => {
    return dispatch({
        type: LOGGER_IN_USER,
        payload: {
            email: user.email,
            token: idTokenResult
        }
    })
}