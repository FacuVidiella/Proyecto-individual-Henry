import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from "../actions/index.js";
import { Link } from "react-router-dom";
import Videogame from './Videogame'
import Paging from "./Page.jsx";

export function Home(){
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames);
    const [currentPage, setCurrentPage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    var finalGameIndex = currentPage + gamesPerPage;
    var indexOfFirst = finalGameIndex - gamesPerPage;
    if(currentPage===1){
        finalGameIndex = 31
        indexOfFirst = 16
    } else if (currentPage===2){
        finalGameIndex = 47
        indexOfFirst = 32
    } else if (currentPage === 3){
        finalGameIndex = 63
        indexOfFirst = 48
    } else if (currentPage === 4){
        finalGameIndex = 79
        indexOfFirst = 64
    } else if (currentPage === 5){
        finalGameIndex = 95
        indexOfFirst = 80
    } else if (currentPage === 6) {
        finalGameIndex = 106
        indexOfFirst = 96
    }
    const currentGames = allGames.slice(indexOfFirst, finalGameIndex);
   
    
    const paginado = (pages) => {
        setCurrentPage(pages)
    }
    
    useEffect(() => {
        dispatch(getGames())
    }, [dispatch])
 
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getGames());
    }    
 

    return(
        <div>
            <Link to='/videogame'>Create Game</Link>
            <h1>Videogames</h1>
            <button onClick={e =>{handleClick(e)}}> reload games </button>
            <>
                <select>
                    <option value= 'asc'>Order asc by rating</option>
                    <option value= 'desc'>Order desc by rating</option>
                </select>
            </>
            <>
                <select>
                    <option value='ascName'>Order asc by name</option>
                    <option value='descName'>Order desc by name</option>
                </select>
            </>
            <>
                <select>
                    <option value='genre'>Filter by genre</option>
                    <option value='created'>Search created</option>
                    <option value='existing'>Search existing</option>
                </select>
            </>
            <Paging gamesPerPage= {gamesPerPage}
            allGames= {allGames.length}
            paginado = {paginado}
            />
        {
            currentGames && currentGames.map(m => {
                return(
                    <>
                        <Link to={'/videogame/' + m.id}>
                        <Videogame name={m.name} img={m.background_image} genre={m.genres} key={m.id}/>
                        </Link>
                    </>
                )
            })
        }    
        </div>
    
        
    )
} 

export default Home