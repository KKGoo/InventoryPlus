import {Sequelize} from 'sequelize';
import {hashPassword} from "../utils/crypto.mjs";
import {userModel} from "./models/user.mjs";
import {companyModel} from "./models/company.mjs";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/data.db'
});

await sequelize.authenticate();

export const User = userModel(sequelize);
await User.sync();

export const Company = companyModel(sequelize);
await Company.sync();

// User management system needed to create admin users securely
// Admin user will be hard-coded for demonstration purposes

await User.findOrCreate({
    where: {
        username: "admin"
    },
    defaults: {
        username: "admin",
        password: await hashPassword("testpassword"),
        role: 0
    }
});

await User.findOrCreate({
    where: {
        username: "user"
    },
    defaults: {
        username: "user",
        password: await hashPassword("testpassword"),
        role: 1
    }
});