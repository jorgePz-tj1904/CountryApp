import axios from "axios";
import { useState, useEffect } from "react"

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
        <div>
          <h1>Activities:</h1>
          {Activities ? (
            Activities.map((activity) => (
              <div key={activity.id}>
                <h3>{activity.nombre}</h3>
                <h4>Difficulty: {activity.dificultad}</h4>
                <h4>Duration: {activity.duracion}</h4>
                <h4>Season: {activity.temporada}</h4>
              </div>
            ))
          ) : (
            <p>No activities available</p>
          )}
        </div>
      );
}

export default Activities;