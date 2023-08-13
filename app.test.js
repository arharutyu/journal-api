import app from './app.js'
import request from 'supertest'

describe("App Test", () => {
  test('GET /', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('application/json')
    expect(res.body.info).toBeDefined()
    expect(res.body.info).toBe('Journal API!')
  })

describe('GET /categories', () => {
  let res

  beforeEach(async () => {
    res = await request(app).get('/categories')
  })
  test('Returns JSON', () => {
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('application/json') 
  })

  test('Returns an array of 4 elements', () => {
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body).toHaveLength(4)
  })

  test('First category has a key "name" with value "Food"', () => {
    expect(res.body[0]).toBeDefined()
    expect(res.body[0].name).toBe('Food')
    
    })
  })
})
