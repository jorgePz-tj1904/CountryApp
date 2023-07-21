const {Activity } = require('../db');

const deleteActivity = async (id) => {
    try {
      const activityId = parseInt(id);
      const activity = await Activity.findByPk(activityId);
  
      if (activity) {
        await activity.destroy();
        return 'Actividad eliminada exitosamente';
      } else {
        throw new Error('No se encontró la actividad');
      }
    } catch (error) {
      throw new Error('Error al eliminar la actividad: ' + error.message);
    }
  };
  
  module.exports = { deleteActivity };