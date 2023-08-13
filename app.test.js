import app from './app.js'
import request from 'supertest'

const validNames = ['Food', 'Gaming', 'Coding', 'Other']

describe("App Test", () => {
  test('GET /', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('application/json')
    expect(res.body.info).toBeDefined()
    expect(res.body.info).toBe('Journal API!')
  })
})
