import axios from "axios";
import { useState, useEffect } from "react"
import styles from './Activities.module.css'
import { NavLink , useNavigate} from "react-router-dom";

const Activities = () => {
  const [Activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const handleActivity = async () => {
    try {
      const response = await axios.get('http://localhost:3001/countries/activities');
      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleActivity();
  }, []);

  const deleteHandler = async (event) => {
    const id = event.target.value;
    const idStr = String(id);
    try {
      await axios(`http://localhost:3001/countries/delete-activity/${idStr}`);
      handleActivity();
    } catch (error) {
      console.log(error);
      // Mostrar mensaje de error en el front-end, por ejemplo, usando un toast o una alerta
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.fondo}>
      <NavLink to='/home'><img src="https://i.ibb.co/rm30PZt/My-project-1-1.png" width={200} /></NavLink>
      <button id={styles.volver} onClick={handleGoBack}>Go Back</button>
      <div className={styles.conteiner}>
        <h1>Activities:</h1>
        <div className={styles.activities}>
          {Activities.length === 0 ? (<div id={styles.error}><img src="https://i.ibb.co/Ldp5L6f/icons8-nada-encontrado-100-1.png" alt="icons8-nada-encontrado-100" border="0"/> <h3>No activities</h3></div>): null}
          {Activities ? (
            Activities.map((activity) => (
              <ul className={styles.activity} key={activity.id}>
                <button id={styles.borrar} value={activity.id} onClick={deleteHandler}>delete</button>
                <h2>{activity.nombre}</h2>
                <img width={200} height={200} src={activity.img} alt="" />
                <li>Difficulty: {activity.dificultad}</li>
                <li>Duration: {activity.duracion}</li>
                <li>Season: {activity.temporada}</li>
                <li>Country: {activity.Countries}</li>
              </ul>
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
