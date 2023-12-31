import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function dbClose() {
  await mongoose.connection.close()
  console.log('Database disconnected')
}

// initialize mongoose instance, connect to mongodb db with connection string
mongoose.connect(process.env.ATLAS_DB_URL)
  // .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect'))
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

const CategoryModel = mongoose.model('Category', categorySchema)

export { CategoryModel, EntryModel, dbClose }