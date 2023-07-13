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
        const nextId = parseInt(countryId)+1;
        const response = await axios.get(`http://localhost:3001/countries/detail?id=${nextId}`);
        setCountryId(nextId.toString());
        return setCountry(response.data);
      }
      if (action === 'prev') {
        const prevId = parseInt(countryId)-1
        const response = await axios.get(`http://localhost:3001/countries/detail?id=${prevId}`);
        setCountryId(prevId.toString())
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
      <NavLink to='/home'><img src="https://i.ibb.co/rm30PZt/My-project-1-1.png" width={200}/></NavLink>
      <div className={styles.conteiner}>
        <h1 id={styles.nombre}>{name}</h1>
        <h5><b>Capital:  </b>{capital}</h5>
        <h5><b>Subregion:  </b>{subregion}</h5>
        <h5><b>Area:  </b>{area}</h5>
        <button className={styles.navButtons} id={styles.prev} onClick={changeCountry} value='prev'>Prev</button>
        <button className={styles.navButtons} id={styles.next} onClick={changeCountry} value='next'>Next</button>
        <h5><b>Population:  </b>{population}</h5>
        <h5><b>Continents:  </b>{continents}</h5>
        <img src={flags} alt={name}/>
      </div>
    </div>
  );
};

export default Detail;