import React from "react";
import styled from "styled-components";



const Container = styled.div`
    background-color:black;
    border: 2px solid #e7e7e7;
    -webkit-box-shadow: -16px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: -16px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: -16px 10px 5px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
    border-style: solid;
    &:hover {           
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
` 


function Game({img, name, genres}){
    return(
        <Container>
            <img src={img} alt='img not found' width = 'auto' height= '100px'/>
            <h5>{name + ' '}
            {
                genres && genres.length && 
                genres.map(m => 
                    <>{'[' + m.name + ']'}</>
                )
            }
            </h5>
            
        </Container>
    );
};

export default Game;