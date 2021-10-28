import React from "react";
import styled from "styled-components";

const Container = styled.li`
    display: inline;
    letter-spacing: 50px;
    padding: 5px

`

const Button = styled.button`
    color: white;
    background-color:#001f3f;
    border-radius:5px;
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;    
    }
`
export default function Paging ({gamesPerPage, allGames, paginado}){
    const pages = [];

    for(let i = 1; i<= allGames/gamesPerPage + 1; i++){
        pages.push(i);
    }
    
    return(
        <nav>
            <ul>
                {pages && pages.map(e => (
                    <Container className='page' key={e}>
                       <Button onClick={() => paginado(e)}>{e}</Button>
                    </Container>
                ))}
            </ul>
        </nav>
    )
}