import { sequelize } from "../db/sequelize.js";
import "../models/note.model.js"

async function syncDatabase() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        console.log('Database synced')
    } catch (error) {
        console.error("Sync failed", error)
    } finally {
        await sequelize.close()
    }
}

syncDatabase()