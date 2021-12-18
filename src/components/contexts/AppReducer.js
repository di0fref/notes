import React from 'react';

export default (state, action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            return {
                folder: state.folder = action.payload
            }
        case 'REMOVE_ITEM':
            return {
                folder: state.folder = []
            }
        default:
            return state;
    }
}