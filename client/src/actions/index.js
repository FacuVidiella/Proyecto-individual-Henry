import axios from 'axios'
export const ADD_VIDEOGAME = 'AddVideogame';
export const GET_VIDEOGAMES = 'GetVideogames';
export const GET_DETAILS = 'GetDetails';
export const GET_GENRES = 'GetGenres';
export const GET_BY_NAME = 'GetByName';
export const FILTER_BY_RATING = 'GetByRating';

export function addGames(payload){
    console.log(payload);
    return(dispatch) => {
        axios.post('http://localhost:3001/videogame', payload)
        .then(res => res.data)
        .then(res => {
            dispatch({ type: ADD_VIDEOGAME, payload: res})
        })
    }
}
export function getGenres(){
    return(dispatch)=> {
        axios.get('http://localhost:3001/genres')
        .then(res => res.data)
        .then(res => {
            dispatch({type: GET_GENRES, payload: res})
        })
    }
}
const filterByName = (a, b) => {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    }
    return 0;
}  
const filterByRating = (a, b) =>  b.rating - a.rating;

export function getGames(filterOptions, genre, existing){
    return(dispatch) => {
        axios.get('http://localhost:3001/videogames')
        .then(res => res.data)
        .then(res => {
            let result;
            
                switch(filterOptions.filter){

                    case 'name':
                        if(filterOptions.order === 'asc'){
                            result = res.sort(filterByName) 
                            
                        } else {
                            result = res.sort(filterByName).reverse()
                        }
                    break;
                    case 'rating':
                        if(filterOptions.order === 'asc'){
                            result = res.sort(filterByRating) 
                        } else {
                            result = res.sort(filterByRating).reverse()
                        }
                    break;
                    
                }
                if(genre !== 'all'){
                    
                    result = result.filter(m => m.genres?.some(p => p.slug === genre))
                    console.log(result)
                }
                if(existing !== 'all'){
                    if(existing === 'existing'){
                        result = result.filter(m => typeof m.id === 'number')
                        
                    } else {
                        
                        result = result.filter(m => typeof m.id !== 'number')
                        
                    }
                }
                dispatch({type: GET_VIDEOGAMES, payload: result})
            
        })
    }
}

export function getDetails(id){
    return(dispatch) => {
        axios.get('http://localhost:3001/videogame/' + id)
        .then(res => res.data)
        .then(res => {
            dispatch({type: GET_DETAILS, payload: res})
        })
    }
}

export function getByName(name){
    return(dispatch) => {
        axios.get('http://localhost:3001/videogames', { params: { name: name } })
        .then(res => res.data)
        .then(res => {
            dispatch({type: GET_BY_NAME, payload: res})
        })
    }
}



