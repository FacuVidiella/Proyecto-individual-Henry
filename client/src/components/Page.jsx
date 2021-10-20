import React from "react";

export default function Paging ({gamesPerPage, allGames, paginado}){
    const pages = [];

    for(let i = 0; i<=Math.ceil(allGames/gamesPerPage); i++){
        pages.push(i+1);
    }
    
    return(
        <nav>
            <ul className='paging'>
                {pages && pages.map(e => (
                    <li className='page' key={e}>
                       <a onClick={() => paginado(e)}>{e}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}