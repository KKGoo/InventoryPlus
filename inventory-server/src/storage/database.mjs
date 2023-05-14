import {Sequelize} from 'sequelize';
import {hashPassword} from "../utils/crypto.mjs";
import {userModel} from "./models/user.mjs";
import {companyModel} from "./models/company.mjs";
import {itemModel} from "./models/item.mjs";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/data.db'
});

await sequelize.authenticate();

export const User = userModel(sequelize);
export const Company = companyModel(sequelize);
export const Item = itemModel(sequelize);

Company.hasMany(Item, {
    foreignKey: "companyNit",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

await User.sync();
await Company.sync();
await Item.sync();

// User management system needed to create admin users securely
// Admin user will be hard-coded for demonstration purposes

await User.findOrCreate({
    where: {
        email: "admin@admin.com"
    },
    defaults: {
        email: "admin@admin.com",
        password: await hashPassword("testpassword"),
        role: 0
    }
});

await User.findOrCreate({
    where: {
        email: "user@user.com"
    },
    defaults: {
        email: "user@user.com",
        password: await hashPassword("testpassword"),
        role: 1
    }
});