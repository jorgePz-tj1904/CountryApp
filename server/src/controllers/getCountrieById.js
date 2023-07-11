const { Countries, Activity } = require('../db');

const getCountryById=async(id)=>{
    try {
      const country = Countries.findByPk(id);
      return country;
    } catch (error) {
      console.log(error);
    }
};

module.exports={getCountryById};