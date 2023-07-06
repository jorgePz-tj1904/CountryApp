const axios = require('axios').default;
const { Countries, Activity } = require('../db');
const { Op } = require('sequelize');
let loadData = null;

const getApiData = async () => {
  try {
    if(loadData == null){
      const response = await axios('http://localhost:5000/countries');
      const countries = response.data;
      for (const country of countries) {
        const { name, capital, subregion, area, flags, population, continents } = country;
        const commonName = name.common;
        const flagImg = flags.png;
        const continentName = continents[0];
        let capitalName = capital ? capital[0] : 'sin';
        let subregionName = subregion ? subregion : 'sin';
        await Countries.create({ name: commonName, flags: flagImg, continents: continentName, capital: capitalName, subregion: subregionName, area, population });
      };
      loadData = countries;
    };
    const listCountries = await Countries.findAll();
    const countriesArray = listCountries.map(country => country.toJSON());
    return countriesArray;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const getCountryByName = async (name) => {
  try {
    const countries = await Countries.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
    return countries;
  } catch (error) {
    console.log('error al buscar el país.', error);
  }
};

const getCountryById=async(id)=>{
  try {
    const country = Countries.findByPk(id);
    return country;
  } catch (error) {
    console.log(error);
  }
};
const postActivity=async(name, difficulty, duration, season, id)=>{
  try {
    const activity = await Activity.create({nombre: name, dificultad: difficulty, duracion: duration, temporada: season});

    const country = await Countries.findByPk(id);
    if(!country) console.log('no se encontro el pais');
    
    await activity.addCountries(country)

  } catch (error) {
    console.log(error);
  }
};

const getActivities=async()=>{
  try {
    const listActivities = await Activity.findAll({include: [{model: Countries, as: 'Countries'}]});

    const arrayActivities = listActivities.map(activity=>{
      const activityData = activity.toJSON();
      activityData.Countries = activity.Countries.map(country=> country.name);
      return activityData;
    });
    return arrayActivities;
  } catch (error) {
    console.log(error);
  }
};


module.exports = { getApiData, getCountryByName, postActivity, getActivities, getCountryById};