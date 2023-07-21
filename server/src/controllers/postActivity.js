const { Countries, Activity } = require('../db');

const postActivity=async(name, difficulty, duration, season, id, img)=>{
    try {
      const activity = await Activity.create({nombre: name, dificultad: difficulty, duracion: duration, temporada: season, img: img});
  
      const country = await Countries.findByPk(id);
      if(!country) console.log('no se encontro el pais');
      
      await activity.addCountries(country)
  
    } catch (error) {
      console.log(error);
    }
};

module.exports={postActivity};