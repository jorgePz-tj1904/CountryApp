const axios = require('axios').default;
const { Countries } = require('../db');

let loadData = null;

const getApiData = async () => {
  try {
    if (loadData == null) {
      const response = await axios('http://localhost:5000/countries');
      const countries = response.data;
      const countriesToCreate = countries.map((country) => {
        const { name, capital, subregion, area, flags, population, continents } = country;
        const commonName = name.common;
        const flagImg = flags.png;
        const continentName = continents[0];
        let capitalName = capital ? capital[0] : 'sin';
        let subregionName = subregion ? subregion : 'sin';
        return { name: commonName, flags: flagImg, continents: continentName, capital: capitalName, subregion: subregionName, area, population };
      });
      await Countries.bulkCreate(countriesToCreate);
      loadData = countries;
    }
    const listCountries = await Countries.findAll();
    const countriesArray = listCountries.map((country) => country.toJSON());
    return countriesArray;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const getApiDataContinents = async (continent) => {
  try {
    let countries;
    switch (continent) {
      case 'Africa':
      case 'Europe':
      case 'Oceania':
      case 'Asia':
      case 'South America':
      case 'North America':
      case 'Antarctica':
        countries = await Countries.findAll({
          where: {
            continents: continent
          }
        });
        return countries.map((country) => country.toJSON());
      
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = { getApiData, getApiDataContinents};
