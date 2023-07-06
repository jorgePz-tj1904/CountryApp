import Card from "./Card";

const Cards=({country})=>{
    return(
        <>
        <div>
        {country.map(({id,name}) => (
        <Card 
          id={id}
          name={name}
        />
      ))}
        </div>
        </>
    )
};

export default Cards;