import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    folder: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addItemToList(item) {
        dispatch({
            type: 'ADD_ITEM',
            payload: item
        });
    }
    function removeItemFromList(item) {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: item
        });
    }

    return(
        <GlobalContext.Provider value = {{folder : state.folder, addItemToList, removeItemFromList}}>
            {children}
        </GlobalContext.Provider>
    )
}