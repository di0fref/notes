import React from 'react';

export default (state, action, variant) => {
    switch(action.type) {
        case 'SET_FOLDER':
            return {
                ...state,
                folder: state.folder = action.payload,
            }
        case 'ADD_RECENT':
            return {
                // recent: state.folder = []
                ...state,
                recent: state.recent.concat(action.payload),
            }
        default:
            return state;
    }
}
