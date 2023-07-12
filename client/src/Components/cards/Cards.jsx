import Card from "./Card";
import styles from './Cards.module.css'

const Cards=({country})=>{
    return(
        <>
        <div className={styles.conteiner}>
        {country.map(({id,name,flags}) => (
        <Card 
          id={id}
          name={name}
          flags={flags}
        />
      ))}
        </div>
        </>
    )
};

export default Cards;