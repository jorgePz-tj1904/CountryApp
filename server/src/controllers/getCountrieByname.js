const { Op } = require('sequelize');
const { Countries} = require('../db');
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

module.exports={getCountryByName};