import React from 'react';
import { NavLink } from 'react-router-dom';

const Card = ({ id, name, flags }) => {
  return (
    <div>
      <img src={flags} alt={name} />
      <p>Country Name: {name}</p>
      <NavLink to={`/detail/${id}`}>detalles</NavLink>
    </div>
  );
};

export default Card;