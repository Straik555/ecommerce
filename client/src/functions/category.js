//URL
import {URL} from "../url";

//Axios
import axios from 'axios';

export const getCategories = async () => {
    return await axios.get(`${URL.appApi}/categories`)
}

export const getCategory = async (slug) => {
    return await axios.get(`${URL.appApi}/category/${slug}`)
}

export const removeCategory = async (slug, authtoken) => {
    return await axios.delete(`${URL.appApi}/category/${slug}`, {
        headers: {
            Authtoken: authtoken
        }
    })
}
export const updateCategory = async (slug, category, authtoken) => {
    return await axios.put(`${URL.appApi}/category/${slug}`, category, {
        headers: {
            Authtoken: authtoken
        }
    })
}

export const createCategory = async (category, authtoken) => {
    return await axios.post(`${URL.appApi}/category`, category, {
        headers: {
            Authtoken: authtoken
        }
    })
}