import React, { useState } from "react";
import Input from './Input';

const Search = ({submitHandler}) => {

    const [input, setInput ] = useState('')    
    
    const submitSearch = (event) => {
        event.preventDefault();
        submitHandler(input);
    }

    const searchStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <form style={searchStyle} onSubmit={submitSearch}>
            <Input value={input} changeHandler={setInput} />
            <button>SEARCH</button>
        </form>
    )
}

export default Search;