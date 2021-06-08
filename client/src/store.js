//Core
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

//Save store in reducer
import {persistStore} from "redux-persist";

//Reducers
import rootReducers from './_reducers'

export const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
)

export const persistors = persistStore(store)