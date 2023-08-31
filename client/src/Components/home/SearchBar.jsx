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
            <button id={styles.buttonSearch} onClick={handleSearch}><img src="https://i.ibb.co/1LBwHRV/icons8-b-squeda-100.png" alt="icons8-b-squeda-100" border="0" width={40}/></button>
        </div>
        </>
    )
};

export default SearchBar;