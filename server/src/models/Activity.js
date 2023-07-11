const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Activity', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    dificultad: { type: DataTypes.INTEGER, allowNull: false, validate: {min:1,max:10,}},
    duracion: { type: DataTypes.INTEGER, allowNull: false, validate: {min:0,max:24,} },
    temporada: { type: DataTypes.STRING, allowNull: false }
  });
};