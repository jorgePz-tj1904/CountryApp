import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
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

  if (!country) {
    return <p>Cargando...</p>;
  }
  if (!country.name) {
    return <p>No se encontró el país con el ID especificado.</p>;
  }

  const { name, capital, subregion, area, flags, population, continents } = country;

  return (
    <>
      <div>
        <h1>{name}</h1>
        <h5>Capital:{capital}</h5>
        <h5>Subregion:{subregion}</h5>
        <h5>Area:{area}</h5>
        <h5>Flag:<img src={flags} alt={name}/></h5>
        <h5>Population:{population}</h5>
        <h5>Continents:{continents}</h5>
      </div>
      <NavLink to='/home'>volver</NavLink>
    </>
  );
};

export default Detail;