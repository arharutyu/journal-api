import { Router } from 'express'
import { EntryModel, CategoryModel } from '../db.js'

const router = Router()

// GET all entries
// use find method on Entry Model to return all entries
router.get('/', async (req, res) => res.send(await EntryModel.find()))

// GET single entry by id
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
  try {  
    const theCat = await CategoryModel.findOne({ name: req.body.category })
    if (theCat) {
      const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat})
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
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = {}
    if (req.body.content) {
      updatedEntry.content = req.body.content
    }
    if (req.body.category) {
      const theCat = await CategoryModel.findOne({ name: req.body.category })
      if (theCat) {
        updatedEntry.category = theCat
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
router.delete('/:id', async (req, res) => {
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

export default router