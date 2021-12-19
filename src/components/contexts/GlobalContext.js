import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    folder: [
        {
            id: 0,
            name: "Root",
            parent_id: 0,
        }
    ],
    recent: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setFolderContext(item) {
        dispatch({
            type: 'SET_FOLDER',
            payload: item,
        });
    }

    function addRecentContext(item) {
        dispatch({
            type: 'ADD_RECENT',
            payload: item,
        });
    }
    return(
        <GlobalContext.Provider value = {
            {
                folder : state.folder,
                recent: state.recent,
                setFolderContext,
                addRecentContext
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
