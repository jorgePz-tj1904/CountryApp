import { useState } from "react";
import styles from './Home.module.css'

const SearchBar=({onSearch})=>{
    const [name, setName] = useState('');

    const handleChange=(event)=>{
        setName(event.target.value);
    };
    const handleSearch=()=>{
        onSearch(name);
        setName('');
    }
    const handleKeyDown =(event)=>{
        if(event.key == 'Enter'){
           onSearch(name);
           setId('');
        }
     }

    return(
        <>
        <div>
            <input onChange={handleChange} onKeyDown={handleKeyDown} value={name} type="text" placeholder="search countries here"/>
            <button id={styles.buttonSearch} onClick={handleSearch}><b>Search</b></button>
        </div>
        </>
    )
};

export default SearchBar;