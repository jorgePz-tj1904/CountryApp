const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Countries', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    capital: { type: DataTypes.STRING, allowNull: false },
    subregion: { type: DataTypes.STRING, allowNull: false },
    area: { type: DataTypes.FLOAT, allowNull: false },
    flags: { type: DataTypes.STRING, allowNull: false },
    population: { type: DataTypes.INTEGER, allowNull: false },
    continents: { type: DataTypes.STRING, allowNull: false }
  });
};
