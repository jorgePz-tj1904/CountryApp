import React from 'react';
import { NavLink } from 'react-router-dom';

const Card = ({ id, name }) => {
  return (
    <div>
      <h3>Country ID: {id}</h3>
      <p>Country Name: {name}</p>
      <NavLink to={`/detail/${id}`}>detalles</NavLink>
    </div>
  );
};

export default Card;