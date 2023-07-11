import { useState, useEffect } from "react";
import axios from "axios";

const From=()=>{
    const [countries, setCountries] = useState([]);
    const [activityName, setActivityName] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [duration, setDuration] = useState(0);
    const [season, setSeason] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(0);

    useEffect(()=>{
        const homeCountries=async()=>{
            try {
                const response = await axios.get('http://localhost:3001/countries');
                setCountries(response.data);
                console.log(response.data);

                setActivityName("");
                setDifficulty(0);
                setDuration(0);
                setSeason("");
                setSelectedCountry(0);
            } catch (error) {
                console.log('no se puede paaaa',error);
            }
        };
        homeCountries();
    },[]);

    const handleSubmit = async(event)=>{
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/countries/post-activity',{
            name: activityName,
            difficulty: difficulty,
            duration: duration,
            season: season,
            id: selectedCountry
            })

            setActivityName("");
                setDifficulty(0);
                setDuration(0);
                setSeason("");
                setSelectedCountry(0);
        } catch (error) {
            
        }
    }

    return(
        <>
        <div>
            <h1>Add a activity</h1>
            <form onSubmit={handleSubmit}>
                
            <input type="text" placeholder="Nombre de la actividad" value={activityName} onChange={(event)=> setActivityName(event.target.value)}/>

            <h4>Ingresa la dificultad {difficulty}</h4>
            <input type="range"  min="0" max="10" value={difficulty} onChange={(event)=> setDifficulty(event.target.value)}></input>

            <h4>Ingresa la duracion (hs)</h4>
            <input type="number" min="1" max="24" value={duration} onChange={(event)=> setDuration(event.target.value)}></input>
            
            <input type="radio" name="season" value="verano" onChange={(event) => setSeason(event.target.value)} />verano
            <input type="radio" name="season" value="primavera" onChange={(event) => setSeason(event.target.value)} />primavera
            <input type="radio" name="season" value="otoño" onChange={(event) => setSeason(event.target.value)} />otoño
            <input type="radio" name="season" value="invierno" onChange={(event) => setSeason(event.target.value)} />invierno

            <select value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
            <option value="" disabled>Seleccionar país</option>
            {countries.map((country) => (<option key={country.id} value={country.id}>{country.name}</option>
            ))}
            </select>
            <button type="submit">crear</button>
            </form>
        </div>
        </>
    )
};

export default From;