//Core
import {combineReducers} from "redux";

//save store in redux
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

//reducers
import userReducer from "./userReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer']
}

const rootReducer = combineReducers({
    userReducer,
})

export default persistReducer(persistConfig, rootReducer)