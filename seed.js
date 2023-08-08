import { EntryModel, CategoryModel } from './db.js'

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

await EntryModel.deleteMany()
await CategoryModel.deleteMany()

await CategoryModel.insertMany(categories)
