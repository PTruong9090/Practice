import { Sequelize } from 'sequelize'
import ENV from '../config/config.js'

export const sequelize = new Sequelize(
    ENV.db_database,
    ENV.db_user,
    ENV.db_pass,
    {
        host: ENV.db_host,
        port: ENV.db_port,
        dialect: 'postgres'
    }

)