import axios from 'axios'
export const ADD_VIDEOGAME = 'AddVideogame';
export const GET_VIDEOGAMES = 'GetVideogames';
export const GET_DETAILS = 'GetDetails';
export const GET_BY_NAME = 'GetByName';
export const FILTER_BY_RATING = 'GetByRating';

export function addGames(game){
    return(dispatch) => {
        axios.post('http://localhost:3001/videogame', game)
        .then(res => res.data)
        .then(res => {
            dispatch({ type: ADD_VIDEOGAME, payload: res})
        })
    }
}

export function getGames(){
    return(dispatch) => {
        axios.get('http://localhost:3001/videogames')
        .then(res => res.data)
        .then(res => {
            dispatch({type: GET_VIDEOGAMES, payload: res})
        })
    }
}

export function getDetails(details){
    return(dispatch) => {
        axios.get('http://localhost:3001/videogame/', details)
        .then(res => res.data)
        .then(res => {
            dispatch({type: GET_DETAILS, payload: res})
        })
    }
}

export function getByName(name){
    return(dispatch) => {
        axios.get('http://localhost:3001/videogames' + name)
        .then(res => res.data)
        .then(res => {
            dispatch({type: GET_BY_NAME, payload: res})
        })
    }
}

