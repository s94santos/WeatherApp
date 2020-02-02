import React, { useState } from "react";
import Input from './Input';

const Search = ({submitHandler}) => {

    const [input, setInput ] = useState('')    
    
    const submitSearch = (event) => {
        event.preventDefault();
        submitHandler(input);
    }
    
    return (
        <form onSubmit={submitSearch}>
            <Input value={input} changeHandler={setInput} />
            <button>OK</button>
        </form>
    )
}

export default Search;