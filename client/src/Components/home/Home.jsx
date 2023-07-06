import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Cards from "../cards/Cards";
import SearchBar from "./SearchBar";

const Home=()=>{
    const [countries, setCountries] = useState([]);

    useEffect(()=>{
        const homeCountries=async()=>{
            try {
                const response = await axios.get('http://localhost:3001/countries');
                setCountries(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('no se puede paaaa',error);
            }
        };
        homeCountries();
    },[]);
    const onSearch=async(name)=>{
        try {
            const response = await axios.get(`http://localhost:3001/countries/search?name=${name}`);
            setCountries(response.data);
        } catch (error) {
            alert('No existe el pais ingresado.')
            console.log(error);
        }
    }
    return(
        <>
        <div>
           <h1>Esto es el home</h1>
           <SearchBar onSearch={onSearch}/>
           <p>anqanakjdnwa anashe Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias nulla repudiandae dolores fugit autem minus id adipisci ratione tempore rerum, numquam perferendis obcaecati odio molestiae voluptatibus, illum, quam qui fugiat.</p>
           <NavLink to='/'>volver</NavLink>
           <Cards country={countries}/>
        </div>
        </>
    )
};

export default Home;