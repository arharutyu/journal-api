import { EntryModel, CategoryModel, dbClose } from './db.js'

const categories = [
  { name: 'Food'}, 
  { name: 'Gaming'}, 
  { name: 'Coding'}, 
  { name:  'Other'}
]

await CategoryModel.deleteMany()
console.log('Deleted categories')
const cats = await CategoryModel.insertMany(categories)
console.log('Inserted categories')

const entries = [
  {category: cats[0], content: 'Is energy'},
  {category: cats[2], content: 'Coding is fun'},
  {category: cats[1], content: 'Stardew Valley is a game.'}
]

await EntryModel.deleteMany()
console.log('Deleted Entries')
await EntryModel.insertMany(entries)
console.log('Inserted Entries')

dbClose()