import express from 'express'
import { EntryModel, CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import catRoutes from './routes/category_routes.js'
import cors from 'cors'

// initialize express instance
const app = express()


app.use(cors())

// middleware to accept JSON data in request body
app.use(express.json())

// GET route for home page
app.get('/', (request, response) => response.send({ info: 'Journal API!!'}))


app.use('/entries', entryRoutes)

app.use('/categories', catRoutes)



export default app