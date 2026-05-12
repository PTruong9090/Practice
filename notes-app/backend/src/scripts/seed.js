import { sequelize } from "../db/sequelize.js";
import { Note } from "../models/note.model.js"

async function seedDatabase() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        await Note.bulkCreate([
            {
                title: "First note",
                body: "This is a seeded note",
            },
            {
                title: 'React practice',
                body: "Practice props, state, effects, and API calls"
            }
        ])

        console.log("Database seeded")
    } catch (error) {
        console.error("Failed to seed ", error)
    } finally {
        await sequelize.close()
    }
}

seedDatabase()