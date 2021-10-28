import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres } from "../actions/index.js";
import { Link } from "react-router-dom";
import Videogame from './Videogame'
import Paging from "./Page.jsx";
import SearchBar from "./SearchBar.jsx";
import styled from "styled-components";
import img from './images/bio-hackers-and-the-matrix-4k-6p.jpg'


const Container = styled.div`
    background-image:url(${img});
    background-repeat: no-repeat;
    background-size:cover;
    min-height: 100vh;
`


const Title = styled.h1`
    font-family: 'Pacifico', cursive;
    text-transform: uppercase;
    font-size: $extra-large;
    margin-right: 50px;
    color: #fff;
    text-shadow:
        0 0 7px #fff,
        0 0 10px #fff,
        0 0 21px #fff,
        0 0 42px #0fa,
        0 0 82px #0fa,
        0 0 92px #0fa,
        0 0 102px #0fa,
        0 0 151px #0fa;  
    
`

const Card = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    padding: .5rem;
    margin-left: 150px;
    width: 900px;
    
` 
const Filter = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
`
const Select = styled.select`
    background-color:rgb(192,192,192);
    border-radius: 5px;
    font-family: "Garamond", serif;
`

const FilterDiv = styled.div`
    display:flex;
    justify-content:center;
    padding: 15px;
    
    background-repeat: no-repeat;
    background-size: auto 500px;
    
`
const Button = styled.button`
    margin-top: 33px;
    margin-right: 15px;
    border-radius: 5px;
    font-family: "Garamond", serif;
    font-size:15px
`


export function Home(){
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    var finalGameIndex = currentPage * gamesPerPage;
    var indexOfFirst = finalGameIndex - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirst, finalGameIndex);
    const allGenres = useSelector((state) => state.genres);
    const [filterGenre, setFilterGenre] = useState('all');
    const [searchExisting, setSearchExisting] = useState('all')
    
    const [filter, setFilter] = useState({
        filter: 'name',
        order: 'asc'
    });
    useEffect(() => {
        dispatch(getGames(filter, filterGenre, searchExisting))
    },[dispatch, filter, filterGenre,searchExisting])
    
    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])
   
    
    const paginado = (pages) => {
        setCurrentPage(pages)
    }
    


    return(
        <Container>
            
            <SearchBar/>
            <FilterDiv>  
            <Title>Videogames</Title>

            <Link exact to='/videogame' style={{textDecoration:'none'}}><Button>Create Game</Button></Link> 
            <Filter>
                <Select value={filter.filter} onChange={e => setFilter({...filter, filter:e.target.value})}>  
                    <option value='name'>Order by name</option>
                    <option value='rating'>Order by rating</option>                    
                </Select>
            </Filter>
            <Filter>  
                <Select value={searchExisting} onChange={e => setSearchExisting(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                    <option value='existing'>Existing</option>
                </Select>
            </Filter>
            <Filter>
                <Select value={filterGenre} onChange={e => setFilterGenre(e.target.value)}>
                    
                    <option value='all'>All genres</option>
                    {allGenres.map(m => (
                        <option value={m.name.toLowerCase()}>{m.name}</option>
                    ))}
                </Select>
            </Filter>
            <Filter>
                <Select value={filter.order} onChange={e => setFilter({...filter, order:e.target.value})}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </Select>
            </Filter>
            </FilterDiv>
        
                          
            <Card>
                {
                
                    currentGames && currentGames.map(m => {
                        return(
                            
                            <Link style={{ color: '#DDDDDD', textDecoration:'none'}} to={'/videogame/' + m.id} > 
                            <Videogame name={m.name} img={m.background_image} genres={m.genres}  key={m.id}/>             
                            </Link>  
                        )
                    }) 
                
                }  
            </Card> 
            
        
        
        
        <Paging gamesPerPage= {gamesPerPage}
            allGames= {allGames.length}
            paginado = {paginado}
            />
         
        </Container>
        
    )
} 

export default Home