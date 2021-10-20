import {ADD_VIDEOGAME, GET_VIDEOGAMES, GET_DETAILS} from '../actions/index.js';

const initialState = {
    videogames: [],
    details: {},
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_VIDEOGAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload]
            };
        case GET_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload
            };
        case GET_DETAILS:
            return{
                ...state,
                details: action.payload
            }        
        default:
            return state;
    }
}

export default reducer