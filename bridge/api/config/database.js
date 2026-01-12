// imports
import { Sequelize } from "sequelize";

// sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
    define: {
        underscored: true,
        timestamps: true,
    },
});

// exports
export default sequelize;
