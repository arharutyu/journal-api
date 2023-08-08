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

// initialize mongoose instance, connect to mongodb db with connection string
mongoose.connect('mongodb+srv://aharuty:mu5hu@cluster0.ci0rfnb.mongodb.net/journal?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect'))
  .catch(err => console.error(err))

// Entries Schema & Model
const entrySchema = new mongoose.Schema({
  category: {type: mongoose.ObjectId, ref: 'Category'},
  content: {type: String, required: true}
 })

const EntryModel = mongoose.model('Entry', entrySchema)

// Category Schema & Model
const categorySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true }
})

const CategoryModel = new mongoose.model('Category', categorySchema)

// // get category
// async function addEntry() {
//   const theCat = await CategoryModel.findOne({ name: 'Coding' })
// // create entry using category id 
//   EntryModel.create({ content: 'Testing category ref', category: theCat._id })
// }
// addEntry()

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
  try {  
    const theCat = await CategoryModel.findOne({ name: req.body.category })
    if (theCat) {
      const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat._id})
      res.status(201).send(insertedEntry)
    } else {
      res.status(400).send({ error: 'Category not found'})
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// PUT (update) entry
app.put('/entries/:id', async (req, res) => {
  try {
    const updatedEntry = {}
    if (req.body.content) {
      updatedEntry.content = req.body.content
    }
    if (req.body.category) {
      const theCat = await CategoryModel.findOne({ name: req.body.category })
      if (theCat) {
        updatedEntry.category = theCat._id
      } else {
      res.status(400).send({ error: 'Category not found' })
      }
    }
      const entry = await EntryModel.findByIdAndUpdate(req.params.id, updatedEntry, { new: true })
        if (entry) {
          res.send(entry)
        } else {
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