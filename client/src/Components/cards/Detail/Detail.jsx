import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

import styles from './Detail.module.css'

const Detail = () => {
  const { id } = useParams();
  const [countryId, setCountryId] = useState(id);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const onSearchById = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/countries/detail?id=${id}`);
        setCountry(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    onSearchById(id);
  }, [id]);

  const changeCountry=async(event)=>{
    try {
      const action = event.target.value;
      if (action === 'next') {
        const response = await axios.get(`http://localhost:3001/countries/detail?id=${parseInt(countryId)+1}`);
        setCountryId(countryId+1)
        return setCountry(response.data);
      }
      if (action === 'prev') {
        const response = await axios.get(`http://localhost:3001/countries/detail?id=${parseInt(countryId)-1}`);
        setCountryId(countryId-1)
        return setCountry(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!country) {
    return <p>Cargando...</p>;
  }
  if (!country.name) {
    return <p>No se encontró el país con el ID especificado.</p>;
  }

  const { name, capital, subregion, area, flags, population, continents } = country;

  return (
    <div className={styles.fondo}>
      <div className={styles.conteiner}>
        <h1 id={styles.nombre}>{name}</h1>
        <h5>Capital:  {capital}</h5>
        <h5>Subregion:  {subregion}</h5>
        <h5>Area:  {area}</h5>
        <img src={flags} alt={name}/>
        <button className={styles.navButtons} id={styles.prev} onClick={changeCountry} value='prev'>Prev</button>
        <button className={styles.navButtons} id={styles.next} onClick={changeCountry} value='next'>Next</button>
        <h5>Population:  {population}</h5>
        <h5>Continents:  {continents}</h5>
      </div>
      <NavLink to='/home'>volver</NavLink>
    </div>
  );
};

export default Detail;