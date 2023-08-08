import express from 'express'
import { EntryModel, CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'


// initialize express instance
const app = express()
const port = 4001

// middleware to accept JSON data in request body
app.use(express.json())

// GET route for home page
app.get('/', (request, response) => response.send({ info: 'Journal API!'}))

// GET all categories
// use find method on Category Model to return all categories
app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.use('/entries', entryRoutes)

app.listen(port)