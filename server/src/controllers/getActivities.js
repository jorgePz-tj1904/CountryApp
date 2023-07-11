const { Countries, Activity } = require('../db');

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

module.exports={getActivities};

