import express from 'express'
import mongoose from 'mongoose'

const categories = [
  { name: 'Food'}, 
  { name: 'Gaming'}, 
  { name: 'Coding'}, 
  { name:  'Other'}
]

const entries = [
  {category: 'Food', content: 'Is energy'},
  {category: 'Coding', content: 'Coding is fun'},
  {category: 'Gaming', content: 'Animal Crossing is a game.'}
]

mongoose.connect('mongodb+srv://aharuty:mu5hu@cluster0.ci0rfnb.mongodb.net/journal?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect'))
  .catch(err => console.error(err))

// Entries Schema & Model
const entrySchema = new mongoose.Schema({
  category: {type: String, required: true},
  content: {type: String, required: true}
 })

const EntryModel = mongoose.model('Entry', entrySchema)

// Category Schema & Model
const categorySchema = new mongoose.Schema({
  name: {type: String, required: true }
})

const CategoryModel = new mongoose.model('Category', categorySchema)

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Journal API!'}))

// GET all categories
// use find method on Category Model to return all categories
app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

// GET all entries
// use find method on Entry Model to return all entries
app.get('/entries', async (req, res) => res.send(await EntryModel.find()))

// GET single entry by id
app.get('/entries/:id', async (req, res) => {
  // try to retrieve using id from url

  // wrap in try catch to gracefully handle errors.
  try {
  // linking search to db. Use findbyId search method and pass in id from params
  // use await and add async to function as using Promise (EntryModel)
  const entry = await EntryModel.findById(req.params.id)
  // if truthey (exists) send entry
    if (entry) {
      res.send(entry)
    } else {
      // otherwise send 404 status and error object
      res.status(404).send({ error: 'Entry not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// POST entry
app.post('/entries', async (req, res) => {
  // using await to wait for the creation of the doc to finish, so add async in callback function above for req, res
  // wrap in try catch block to gracefully handle errors
  try {  
    // create new entry using Entry Model, passing in request body
    const insertedEntry = await EntryModel.create(req.body)
    //  send response 201 created status, and inserted entry
    res.status(201).send(insertedEntry)
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// PUT (update) entry
app.put('/entries/:id', async (req, res) => {
  try {
    // get entry by params id
    // pass options object set new: true to return updated entry instead of original
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // if truthey (entry exists)
      if (entry) {
        res.send(entry)
      } else {
        // otherwise send 404 status and error object
        res.status(404).send({ error: 'Entry not found' })
      }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// DELETE entry
app.delete('/entries/:id', async (req, res) => {
  try {
    // get entry by params id
    const entry = await EntryModel.findByIdAndDelete(req.params.id)
    // if truthey (entry exists)
      if (entry) {
        res.sendStatus(200)
      } else {
        // otherwise send 404 status and error object
        res.status(404).send({ error: 'Entry not found' })
      }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})
app.listen(port)