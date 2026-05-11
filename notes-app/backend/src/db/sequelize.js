import { Sequelize } from "sequelize";
import { ENV } from "../config/config.js";

export const sequelize = new Sequelize(
    ENV.database,
    ENV.username,
    ENV.password,
    {
        host: ENV.host,
        port: ENV.port,
        dialect: 'postgres',
    }
)