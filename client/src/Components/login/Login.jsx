import { NavLink } from "react-router-dom";
import styles from './Login.module.css'

const Login=()=>{
    return(
        <>
        <div className={styles.conteiner}>
            <img src="https://i.ibb.co/rm30PZt/My-project-1-1.png" alt="Countries-Logo" width={300}/>
            <p className={styles.welcome}>Welcome to our countries app! Here you can explore and discover important information about different countries around the world. Immerse yourself in a learning experience as you explore relevant data such as country names, capitals, populations, geographic areas, and much more.<br/><br/> Our app allows you to search for specific countries, sort them alphabetically or by population, and even filter by continent. Whether you're planning a trip, conducting research, or just browsing, we're sure you'll find this tool useful and fascinating. Begin your adventure and discover the diversity and richness of our global community of nations!</p>
            <NavLink className={styles.buttom}  to='/home'><b>Go!</b></NavLink>
        </div>
        </>
    )
}

export default Login;