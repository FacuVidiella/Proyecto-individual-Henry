import React from "react"; 
import { useState } from "react"; 
import { useDispatch } from "react-redux"; 
import { getByName } from '../actions/index.js';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getByName(name))
    }

    return (
        <div>
            <input 
                type='text'
                placeholder='Search...'
                onChange = {(e) => handleInputChange(e)}
            />
            <button type= 'submit' onClick={(e)=> handleSubmit}>Search</button>
        </div>
    )
}