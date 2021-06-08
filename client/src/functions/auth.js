//URL
import {URL} from "../url";

//Axios
import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(`${URL.appApi}/create-or-update-user`, {}, {
        headers: {
            Authtoken: authtoken,
        }
    })
}

export const currentUser = async (authtoken) => {
    return await axios.post(`${URL.appApi}/current-user`, {}, {
        headers: {
            Authtoken: authtoken,
        }
    })
}

export const roleBasedRedirect = (res, history) => {
    if(res.data.role === 'admin') {
        history.push("/admin/dashboard")
    } else {
        history.push('/user/history')
    }
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(`${URL.appApi}/current-admin`, {}, {
        headers: {
            Authtoken: authtoken,
        }
    })
}
