import express from 'express'
import cors from 'cors'
import { sequelize } from './db/sequelize.js'
import { errorHandler } from './middlewares/middlewares.js'
import todoRouter from './routes/todo.routes.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/health', (req, res) => {
    return res.json({ok: true})
})

app.use('/api/todo', todoRouter)
app.use(errorHandler)

async function startServer() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been successfully established')

        await sequelize.sync()
        console.log('Database synced')

        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}


startServer()

