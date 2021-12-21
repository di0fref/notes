import React from 'react';

export default (state, action, variant) => {
    switch(action.type) {
        case 'SET_FOLDER':
            return {
                ...state,
                folder: state.folder = action.payload,
            }
        case 'SET_RECENT':
            return {
                ...state,
                recent: state.recent = action.payload,
            }
        default:
            return state;
    }
}
