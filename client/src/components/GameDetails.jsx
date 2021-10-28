import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";  
import styled from 'styled-components';
import img from './images/bio-hackers-and-the-matrix-4k-6p.jpg'


const Image = styled.img`
    height: 200px;
    
`

const Container = styled.div`
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
`
const Title = styled.h1`
    color: RGB(221, 65, 36);
`

const Genres = styled.h3`
    color: RGB(221, 65, 36);
`

const Desc = styled.p`
    color: RGB(221, 65, 36);
`


const Text = styled.h4`
    color: RGB(221, 65, 36);
`

function GetDetails(props){
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
    },[dispatch])

    const videogame = useSelector((state) => state.details);
    
    if(Array.isArray(videogame.platforms)){
        var plataforma = videogame.platforms?.map(e => e.platform)
    }
    return (
        <Container>
        {
            videogame ? 
                <div>
                    <Image src={videogame.background_image} alt='No image available'/>
                    <Title>{videogame.name}</Title>
                    <Genres>{videogame.genres?.map(e => (e.name + ' '))}</Genres>
                    <Desc>{videogame.description?.replace(/<[^>]+>/g, '')}</Desc>
                    <Text>{'Rating: ' + videogame.rating}</Text>
                    <Text>{Array.isArray(videogame.platforms) ? plataforma?.map(e => e.name + ' | ') : videogame.platforms}</Text>
                    <Text>{Array.isArray(videogame.platforms)? videogame.platforms?.map(e => e.released_at + ' | ') : videogame.releaseDate}</Text>

                </div> : <p>Pacience is a virtue...</p>
            
        }
        <Link style={{ color: 'black', textDecoration:'none'}} to='/videogames'>Go home</Link>
        </Container>

    )
}
export default GetDetails;