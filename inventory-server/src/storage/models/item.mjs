import {DataTypes} from "sequelize";


export const itemModel = (sequelize) => {
    return sequelize.define("Item", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
};