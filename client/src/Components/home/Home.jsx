import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Cards from "../cards/Cards";
import SearchBar from "./SearchBar";

import styles from './Home.module.css'

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);


  const indexOfLastCountry = currentPage * perPage;
  const indexOfFirstCountry = indexOfLastCountry - perPage;
  const countriesToShow = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountries(response.data);
        const uniqueContinents = Array.from(new Set(response.data.map(country => country.continents)));
        setContinents(uniqueContinents);
        const activities = await axios.get('http://localhost:3001/countries/activities');
        if (Array.isArray(activities.data)) {
        setActivities(activities.data);
        }
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
      setError(false)
      setCountries(response.data);
    } catch (error) {
      setError(true);
      setCountries([])
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
  const totalPages = Math.ceil(countries.length / perPage);

  const nextPage=()=>{
    if(currentPage < totalPages){
        setCurrentPage(currentPage + 1);
    }
  };
  const prevPage=()=>{
    if(currentPage > 1){
        setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className={styles.conteiner}>
        <NavLink to='/home'><img src="https://i.ibb.co/rm30PZt/My-project-1-1.png" width={200}/></NavLink>
        <SearchBar onSearch={onSearch} />
        <NavLink className={styles.buttonActivities} id={styles.crearActividad} to='/create-activity'>Create tourist activity</NavLink><br />
        <NavLink className={styles.buttonActivities} id={styles.listaActividades} to='/activities'>Activities list</NavLink>
        <p id={styles.parrafo}>Search, explore, learn about the capitals, sub-regions and continents.</p>

        <select id={styles.order} className={styles.orderSelect}  onChange={orderHandler}>
          <option selected disabled hidden>Order</option>
          <option value="ASC-alf">Order alphabetically ASC</option>
          <option value="DESC-alf">Order alphabetically DESC</option>
          <option value="ASC-pop">Sort by population ASC</option>
          <option value="DESC-pop">Sort by population DESC</option>
        </select>

        <select id={styles.continents} className={styles.orderSelect} onChange={continentsHandler}>
          <option selected disabled hidden>Filter by continent</option>
          {continents.map((continent) => (<option key={continent} value={continent}>{continent}</option>))}
        </select>
        {error===true?(<div id={styles.error}><img src="https://i.ibb.co/C6gq61x/icons8-nada-encontrado-100.png" alt="icons8-nada-encontrado-100" border="0"/> <h3>Country not found</h3></div>):null}
        {countries.length === 0 ? (
        <div className={styles.loadingContainer}>
        <img id={styles.cargando} width={200} src="https://i.ibb.co/ky8LyRJ/cargando.gif" alt="cargando" border="0" /></div>) : null}
        <Cards country={countriesToShow}/>
        <div>
          <button className={styles.buttonsPages} onClick={prevPage} disabled={currentPage === 1}>Prev page</button>
          <h1 id={styles.page}>{currentPage}</h1>
          <button className={styles.buttonsPages} onClick={nextPage} disabled={currentPage === Math.ceil(countries.length / perPage)}>Next page</button>
        </div>
      </div>
    </>
  );
};

export default Home;