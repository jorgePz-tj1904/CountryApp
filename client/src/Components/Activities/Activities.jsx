import axios from "axios";
import { useState, useEffect } from "react"
import styles from './Activities.module.css'
import { NavLink } from "react-router-dom";

const Activities=()=>{
    const [Activities, setActities] = useState(null);
    const handleActivity=async()=>{
        try {
          const response = await axios.get('http://localhost:3001/countries/activities');
          setActities(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        handleActivity();
    },[])
    return (
        <div className={styles.fondo}>
          <NavLink to='/home'><img src="https://i.ibb.co/rm30PZt/My-project-1-1.png" width={200}/></NavLink>
          <div className={styles.conteiner}>
          <h1>Activities:</h1>
          <div className={styles.activities}>
          {Activities ? (
            Activities.map((activity) => (
              <div className={styles.activity} key={activity.id}>
                <h3 id={styles.nombre}>{activity.nombre}</h3>
                <h4>Difficulty:  {activity.dificultad}</h4>
                <h4>Duration:  {activity.duracion}</h4>
                <h4>Season:  { activity.temporada}</h4>
                <h4>Country: {activity.Countries}</h4>
              </div>
            ))
          ) : (
            <p>No activities available</p>
          )}
          </div>
        </div>
        </div>
      );
}

export default Activities;