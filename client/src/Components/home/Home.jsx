import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Cards from "../cards/Cards";
import SearchBar from "./SearchBar";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountries(response.data);
        const uniqueContinents = Array.from(new Set(response.data.map(country => country.continents)));
        setContinents(uniqueContinents);
        console.log('200 OK');
      } catch (error) {
        console.log('No se puede obtener los países:', error);
      }
    };

    fetchData();
  }, []);

  const onSearch = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/search?name=${name}`);
      setCountries(response.data);
    } catch (error) {
      alert('No se encontró el país ingresado.');
      console.log(error);
    }
  };

  const orderHandler = async (event) => {
    try {
      const order = event.target.value;
      let orderedCountries = [];
      
      switch (order) {
        case 'ASC-alf':
          orderedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
          break;
  
        case 'DESC-alf':
          orderedCountries = [...countries].sort((a, b) => b.name.localeCompare(a.name));
          break;
  
        case 'ASC-pop':
          orderedCountries = [...countries].sort((a, b) => a.population - b.population);
          break;
  
        case 'DESC-pop':
          orderedCountries = [...countries].sort((a, b) => b.population - a.population);
          break;
  
        default:
          break;
      }
      
      setCountries(orderedCountries);
    } catch (error) {
      console.log(error);
    }
  };

  const continentsHandler = async (event) => {
    try {
      const continent = event.target.value;
      const response = await axios.get(`http://localhost:3001/countries/continent?continent=${continent}`);
      if (Array.isArray(response.data)) {
        setCountries(response.data);
      }
      console.log('no es un arr:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Esto es el home</h1>
        <SearchBar onSearch={onSearch} />
        <NavLink to='/create-activity'>Crear actividad turística</NavLink><br />
        <NavLink to='/activities'>Lista de actividades</NavLink>
        <p>anqanakjdnwa anashe Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias nulla repudiandae dolores fugit autem minus id adipisci ratione tempore rerum, numquam perferendis obcaecati odio molestiae voluptatibus, illum, quam qui fugiat.</p>

        <select onChange={orderHandler}>
          <option selected disabled hidden>Selecciona una opción</option>
          <option value="ASC-alf">Ordenar alfabéticamente ASC</option>
          <option value="DESC-alf">Ordenar alfabéticamente DESC</option>
          <option value="ASC-pop">Ordenar por población ASC</option>
          <option value="DESC-pop">Ordenar por población DESC</option>
        </select>

        <select onChange={continentsHandler}>
          <option selected disabled hidden>Filtrar por continente</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>{continent}</option>
          ))}
        </select>

        <NavLink to='/'>Volver</NavLink>
        <Cards country={countries} />
      </div>
    </>
  );
};

export default Home;