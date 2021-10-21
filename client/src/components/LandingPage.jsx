import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import img from './images/matrix.png'



const Container = styled.div`
    background-image:url(${img});  
    background-size: cover;
    padding: 250px;
`
  
const Title = styled.h1`
    color: white;
    text-align: center;

`
const Button = styled.button`
    background-color:red;
    border-style:inset;
    border-radius: 10px;
    font-size:100px;
    padding:10px 30px;
    color:white;
`
const NewButton = styled.button`
    background-color:blue;
    border-style:inset;
    border-radius: 10px;
    font-size:100px;
    padding:10px 30px;
`



export function LandingPage(){
    return (
        <Container>  
            <Title>Welcome to my page</Title>
            <Link to='/videogames'><Button></Button></Link>
            <Link to='/wrong'><NewButton></NewButton></Link>
        </Container>
    )
}

export default LandingPage;