import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate} from "react-router-dom";

import styles from './Detail.module.css'

const Detail = () => {
  const { id } = useParams();
  const [countryId, setCountryId] = useState(id);
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

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

  const handleGoBack = () => {
    navigate(-1);
  };

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
    return <img id={styles.cargando} width={200} src="https://i.ibb.co/ky8LyRJ/cargando.gif" alt="cargando" border="0" />;
  }
  if (!country.name) {
    return <p>No se encontró el país con el ID especificado.</p>;
  }

  const { name, capital, subregion, area, flags, population, continents, maps, Activities} = country;
  function searchOnGoogle() {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
    window.open(searchUrl, '_blank');
  }

  return (
    <div className={styles.fondo}>
      <NavLink to='/home'><img src="https://i.ibb.co/rm30PZt/My-project-1-1.png" width={200}/></NavLink>
      <button id={styles.volver} onClick={handleGoBack}>Go Back</button>
      <div className={styles.conteiner}>
        <h1 id={styles.nombre}>{name}</h1>
        <button className={styles.navButtons} id={styles.prev} onClick={changeCountry} value='prev'>Prev</button>
        <button className={styles.navButtons} id={styles.next} onClick={changeCountry} value='next'>Next</button>
        <img src={flags} alt={name}/>
        <ul id={styles.detalles}>
          <li><b>Capital: {capital}</b></li>
          <li><b>Subregion: {subregion}</b></li>
          <li><b>Area: {area} km²</b></li>
          <li><b>Population: {population}</b></li>
          <li><b>Continents: {continents}</b></li>
          <li><b>Activities: {Activities.length === 0 ? 'no activities' : Activities.map(act=> `${act.nombre}. `)}</b></li>
        </ul>
        <a id={styles.maps} href={maps} target="blank">See on Google maps</a>
        <button onClick={searchOnGoogle} id={styles.buscar}>Search on Google</button>
      </div>
    </div>
  );
};

export default Detail;