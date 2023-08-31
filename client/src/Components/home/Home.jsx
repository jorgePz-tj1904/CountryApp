import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, searchCountry, orderCountries, filterByContinent, getContinents, getActivities, getCountriesByAct} from '../../redux/actionCountries';
import { NavLink } from "react-router-dom";

import Cards from "../cards/Cards";
import SearchBar from "./SearchBar";

import styles from './Home.module.css'
const Home = () => {
  const countries = useSelector(state => state.countries);
  const continents = useSelector(state=> state.continents);
  const activities = useSelector(state=> state.activities);
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const indexOfLastCountry = currentPage * perPage;
  const indexOfFirstCountry = indexOfLastCountry - perPage;
  const countriesToShow = countries.length > 0 ? countries.slice(indexOfFirstCountry, indexOfLastCountry) : [];
  
  
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(fetchCountries());
      dispatch(getContinents());
      dispatch(getActivities());

      return ()=>{
        dispatch(fetchCountries());
        console.log('se desmonto home');
      }
  }, []);
  
  const onSearch = async (name) => {
    try {
      dispatch(searchCountry(name));
      setCurrentPage(1)
      setError(false)
    } catch (error) {
      setError(true)
      console.log(error);
    }
  };
  
  const orderHandler = (event) => {
    try {
      const order = event.target.value;
      dispatch(orderCountries(order));
      setCurrentPage(1)
    } catch (error) {
      console.log(error);
    }
  };
  const continentsHandler = async (event) => {
    try {
      const continent = event.target.value;
      dispatch(filterByContinent(continent));
      setCurrentPage(1)
    } catch (error) {
      console.log(error);
    }
  };

  const countriesByActHandler=async(event)=>{
    try {
      const activityName = event.target.value;
      dispatch(getCountriesByAct(activityName));
      setCurrentPage(1)
    } catch (error) {
      console.log('no se pudieron filtrar los paises', error);
    }
  }

  
  const totalPages = Math.ceil(countries.length / perPage);
  
  const nextPage=()=>{
    if(currentPage < totalPages){
      setCurrentPage(currentPage +1);
    }
  };
  const prevPage=()=>{
    if(currentPage > 1){
      setCurrentPage(currentPage -1);
    }
  };
  return (
    <>
      <div className={styles.conteiner}>
        <NavLink id={styles.salir} to='/'><i class="fa-solid fa-right-from-bracket"></i></NavLink>
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

        <select onChange={countriesByActHandler}  className={styles.orderSelect}>
        <option selected disabled hidden>Filter by Activity</option>
        {activities.length ===0? <option disabled>no activities</option>:null }
        {activities.map((act)=>(<option key={act.id} value={act.nombre}>{act.nombre}</option>))}
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