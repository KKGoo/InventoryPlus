import {DataTypes} from "sequelize";

export const itemModel = (sequelize) => {
    const Item = sequelize.define("Item", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Item.associate = (models) => {
      Item.belongsTo(models.Company, {
        foreignKey: "companyNit",
        allowNull: false,
      });
    };
  
    return Item;
  };