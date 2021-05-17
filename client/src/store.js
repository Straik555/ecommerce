//Core
import React from 'react';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

//Save store in reducer
import {persistStore} from "redux-persist";

//Reducers
import rootReducers from './_reducers'

export const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware())
)

export const persistors = persistStore(store)