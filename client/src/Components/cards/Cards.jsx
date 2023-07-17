import Card from "./Card";
import styles from './Cards.module.css'

const Cards=({country})=>{
    return(
        <>
        <div className={styles.conteiner}>
        {country.map(({id,name,flags, continents}) => (
        <Card 
          id={id}
          name={name}
          flags={flags}
          continents={continents}
        />
      ))}
        </div>
        </>
    )
};

export default Cards;