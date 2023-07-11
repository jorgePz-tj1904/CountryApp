import Card from "./Card";

const Cards=({country})=>{
    return(
        <>
        <div>
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