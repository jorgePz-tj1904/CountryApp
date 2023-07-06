import { useState } from "react";

const SearchBar=({onSearch})=>{
    const [name, setName] = useState('');

    const handleChange=(event)=>{
        setName(event.target.value);
    };
    const handleSearch=()=>{
        onSearch(name);
        setName('');
    }

    return(
        <>
        <div>
            <input onChange={handleChange} value={name} type="text"/>
            <button onClick={handleSearch}>buscar</button>
        </div>
        </>
    )
};

export default SearchBar;