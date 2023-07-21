import { useState, useEffect } from "react";
import axios from "axios";
import styles from './Form.module.css'
import { NavLink, useNavigate} from "react-router-dom";
import validateForm from "./Validacion";

const Form=()=>{
    const [countries, setCountries] = useState([]);
    const [activityName, setActivityName] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [duration, setDuration] = useState(0);
    const [season, setSeason] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [url , setUrl] = useState('')
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        const homeCountries=async()=>{
            try {
                const response = await axios.get('http://localhost:3001/countries');
                const orderedCountries = [...response.data].sort((a, b) => a.name.localeCompare(b.name));
                setCountries(orderedCountries);
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
        const newErrors = validateForm(activityName, difficulty, duration, season, selectedCountry,url);
       setErrors(newErrors);
       if(Object.keys(newErrors).length === 0){
        try {
            await axios.post('http://localhost:3001/countries/post-activity',{
            name: activityName,
            difficulty: difficulty,
            duration: duration,
            season: season,
            id: selectedCountry,
            img: url
            })
            setActivityName("");
            setDifficulty(0);
            setDuration(0);
            setSeason("");
            setSelectedCountry(0);
            setUrl('');
            setDone(true)
        } catch (error) {
            console.log(error);
        }
       }
    };
    const handleGoBack = () => {
        navigate(-1);
      };
    return(
        <div className={styles.fondo}>
         <NavLink to='/home'><img src="https://i.ibb.co/rm30PZt/My-project-1-1.png" width={200}/></NavLink>
         <button id={styles.volver} onClick={handleGoBack}>Go Back</button>
         <div className={styles.conteiner}>
            <h1>Add a activity</h1>
            {
                !done ? <form onSubmit={handleSubmit}>
                
                <input id={styles.inputName} type="text" placeholder="Name of the activity" value={activityName} onChange={(event)=>{
                     setActivityName(event.target.value);
                }}/>
                {errors.activityName && <p className={styles.error}>{errors.activityName}</p>}

    
                <h4>Enter the difficulty  {difficulty}</h4>
                <input id={styles.dificultad} type="range"  min="0" max="10" value={difficulty} onChange={(event)=> setDifficulty(event.target.value)}></input>

                {errors.difficulty && <p className={styles.error}>{errors.difficulty}</p>}

                <h4>Enter the duration (hs)</h4>
                <input id={styles.horas} max={24} type="number"  value={duration} onChange={(event)=> setDuration(event.target.value)}></input>
                {errors.duration && <p className={styles.error}>{errors.duration}</p>}
    
                <div className={styles.cheks}>
                    <h3>Choose the season of the year</h3>
                 <input type="radio" name="season" value="verano" onChange={(event) => setSeason(event.target.value)} />verano 
                 <input type="radio" name="season" value="primavera" onChange={(event) => setSeason(event.target.value)} />primavera 
                 <input type="radio" name="season" value="otoño" onChange={(event) => setSeason(event.target.value)} />otoño 
                 <input type="radio" name="season" value="invierno" onChange={(event) => setSeason(event.target.value)} />invierno 
                </div>
                {errors.season && <p className={styles.error}>{errors.season}</p>}

                <h4>URL de imagen</h4>
                <input type="text" placeholder="URL" value={url} onChange={(event)=> setUrl(event.target.value)}/>
                {errors.url && <p className={styles.error}>{errors.url}</p>}
                <h4>Select country:</h4>
                <select id={styles.paises} value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
                  <option value="" disabled hidden>Select country</option>
                  {countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                   ))}
                </select><br/>
                {errors.selectedCountry && <p className={styles.error}>{errors.selectedCountry}</p>}
                <button id={styles.botonCrear} type="submit">Create</button>
                </form> : (<div>
                             <h2 id={styles.done}>Done!</h2>
                             <NavLink id={styles.list} to='/activities'>Activities list</NavLink><br />
                             <button id={styles.other} onClick={()=>setDone(false)}>add another activity</button>
                          </div>)
            }
         </div>
        </div>
    )
};

export default Form;