import { Router } from 'express'
import { EntryModel, CategoryModel } from '../db.js'

const router = Router()

// GET all categories
// use find method on Category Model to return all categories
router.get('/', async (req, res) => res.send(await CategoryModel.find()))


export default router