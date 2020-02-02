import React, { useState } from "react";

const Input = ({value, changeHandler}) => {
    
    const handleChange = (event) => {
        changeHandler(event.target.value);
    }

    return (
        <input value={value} onChange={handleChange} ></input>
    )
}

export default Input;