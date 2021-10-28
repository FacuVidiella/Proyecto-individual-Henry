import {ADD_VIDEOGAME, GET_VIDEOGAMES, GET_DETAILS, GET_GENRES, GET_BY_NAME} from '../actions/index.js';

const initialState = {
    videogames: [],
    genres: [],
    details: [],
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
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }
        
        default:
            return state;
    }
}

export default reducer