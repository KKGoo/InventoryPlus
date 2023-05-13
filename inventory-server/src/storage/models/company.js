import { DataTypes } from "sequelize";
const sequelize = require('../database');

const companyModel = sequelize.define("Company", {
  nit: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

companyModel.associate = (models) => {
  companyModel.hasMany(models.Item, {
    foreignKey: "companyNit",
  });
};

module.exports = companyModel;
