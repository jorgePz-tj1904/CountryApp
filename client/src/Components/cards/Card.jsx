import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Card.module.css'

const Card = ({ id, name, flags }) => {
  return (
    <div className={styles.conteiner}>
      <img src={flags} alt={name} width={200}/>
      <p id={styles.nombre}><b>{name}</b></p>
      <NavLink id={styles.detalles} to={`/detail/${id}`}><b>Details</b></NavLink>
    </div>
  );
};

export default Card;