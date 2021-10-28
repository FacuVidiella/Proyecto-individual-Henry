import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addGames, getGenres } from '../actions';
import styled from 'styled-components';
import img from './images/mat.jpg'

const Button = styled.button`
    margin-top: 33px;
    margin-right: 15px;
    border-radius: 5px;
    font-family: "Garamond", serif;
    font-size:15px
`
const Span = styled.span`
    background-color: skyblue;
    -webkit-box-shadow: -16px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: -16px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: -16px 10px 5px 0px rgba(0,0,0,0.75);
    
    border-style: solid;

`
const Container = styled.div`
    background-image: url(${img});
    background-image: no-repeat;
    background-size:cover;
    height:100vh;
    
`
const Form = styled.form`
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;  
    display: inline; 
    justify-content: flex-end; 
`
const Title = styled.h1`
    font-family: 'Pacifico', cursive;
    text-transform: uppercase;
    font-size: $extra-large;
`

function CreateGame(){
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres)
    const [ selectedPlatform, setSelectedPlatform ] = useState(null)
    const [ showMessage, setShowMessage ] = useState({
        message: '¡Videogame Created!',
        show: false
    })
    
    const [selectedGenre, setSelectedGenre] = useState(null)
    const[input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: []
    });
    
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage({...showMessage, show: true })
        dispatch(addGames(input))
    }
    const handleGenres = (e) => {
        e.preventDefault();
        if(selectedGenre && !input.genres.includes(selectedGenre)){
            setInput({...input, genres:[...input.genres, selectedGenre]});
        }
        
    }
    const handlePlatforms = (e) =>{
        e.preventDefault();
        if(selectedPlatform && !input.platforms.includes(selectedPlatform)){
            setInput({...input, platforms:[...input.platforms, selectedPlatform]});
        }
    }
    useEffect(() => {
        dispatch(getGenres());
    },[dispatch])

    return(

        <Container>
            <Link to='/videogames'><Button>Return Home</Button></Link>
            <Title>Create Videogame</Title>
        
            <Form>
                <div>
                    <label>Name </label>
                    <input type='text' value={input.name} name='name' maxLength='30' onChange={handleChange}/>
                </div>
                <div>
                    <label>Description </label>
                    <input type='text' maxLength='250' value={input.description} onChange={handleChange} name='description'/>
                </div>
                <div>
                    <label>Released </label>
                    <input type='date' value={input.released} onChange={handleChange} name='released' />
                </div>
                <div>
                    <label>Rating </label>
                    <input type='number' max='500' min='0' step='0.01' pattern='^\d*(\.\d{0,2})?$' onChange={handleChange} value={input.rating} name='rating' />
                </div>
                <div>
                    <label>Genres </label>
                    <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}id='Genres'>
                        
                        {allGenres.map(e => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    <button onClick={(e) => handleGenres(e)}>Add Genre</button>
                    {!!input.genres.length && input.genres.map(m => <span>{m + ' '}</span>)}
                </div>
                <div>
                    <label>Platforms </label>
                    <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} id= 'platforms'>
                       <option value="Pc">PC</option>
                       <option value="Mac">MacOs</option>
                       <option value="Linux">Linux</option>
                       <option value="Playstation">Playstation</option>
                       <option value="Playstation2">Playstation 2</option>
                       <option value="Playstation3">Playstation 3</option>
                       <option value="Playstation4">Playstation 4</option>
                       <option value="Playstation5">Playstation 5</option>
                       <option value="Psvita">PS Vita</option>
                       <option value="psp">PSP</option>
                       <option value="Xbox1">Xbox-one</option>
                       <option value="XboxS">XboxSeries S/X</option>
                       <option value="Xbox360">Xbox 360</option>
                       <option value="Xbox">Xbox</option>
                       <option value="Nintendo">Nintendo Switch</option>
                       <option value="Nintendo3ds">Nintendo 3DS</option>
                       <option value="Nintendods">Nintendo DS</option>
                       <option value="Nintendodsi">Nintendo DSi</option>
                       <option value="wiiu">Wii U</option>
                       <option value="wii">Wii</option>
                       <option value="ios">IOS</option>
                       <option value="android">Android</option>
                    </select>
                    <button onClick={(e) => handlePlatforms(e)}>Add platform</button>
                    {!!input.platforms.length && input.platforms.map(m => <span>{m + ' '}</span>)}
                </div>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                {
                    showMessage.show && <Span>{showMessage.message}</Span>
                }
            </Form>
        </Container>
        
    )
}

export default CreateGame