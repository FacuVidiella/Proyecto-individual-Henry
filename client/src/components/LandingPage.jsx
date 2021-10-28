import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import img from './images/matrix.png';
import img2 from './images/red_pill.png';


const Container = styled.div`
    background-image:url(${img});
    background-size: cover;
    padding: 250px;
`
  
const S = styled.p`
    color:white;
    font-family:Lucida Console, Courier, Monotype;
    text-shadow: 1px 1px 0px green;
`


const Image = styled.img`
    width: 50px;
    margins: 5px;
    border: none;
    border-width:0;
    &:hover{
        padding: 1px;
        width: 50px;
    }
`


export function LandingPage(){
    return (
        <Container> 
            
            <S>Take the red pill to go Home</S>
            <Link to='/videogames'><Image src={img2} alt='img not found'/></Link>
        </Container>
    )
}

export default LandingPage;