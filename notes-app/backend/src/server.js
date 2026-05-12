import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { sequelize } from "./db/sequelize.js"
import noteRouter from './routes/note.route.js'

const app = express()

const PORT = process.env.PORT || 3000
console.log(PORT)

app.use(cors())
app.use(express.json())
app.use('/api/notes', noteRouter)

app.get('/health', (req, res) => {
    res.json({ ok: true })
})

async function startServer() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established sucessfully')

        await sequelize.sync()
        console.log("Database synced")

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}

startServer()


