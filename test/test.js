const api = require('../api_controller')
const mysql = require('mysql')
const query = require('../api/query')
const assert = require('assert')

describe('test getAllData()', () => {
  it('get all the data', async () => {
    const result = await api.selectAllData('user')
    console.log(result)
  })
})

describe('test read()', () => {
  it('respond the user table', async () => {
    const result = await api.read({
      tableName: 'user'
    })
    console.log(result)
  })
  it('respond the rows of fields', async () => {
    const result = await api.read({
      tableName: 'user',
      fields: ['id', 'email']
    })
    console.log(result)
  })
  it('test args with where', async () => {
    const result = await api.read({
      tableName: 'user',
      where: {
        id: 1,
        email: '1@example.com'
      }
    }) 
    console.log(result)
  })
  it('test three args', async () => {
    const result = await api.read({
      tableName: 'user',
      fields: ['id', 'password'],
      where: {
        id: 1
      }
    })
    console.log(result)
  })
})

describe('test query()', () => {
  it('query', async () => {
    const result = await api.query("SELECT * FROM user WHERE id = 1")
    console.log(result)
  })
})

describe('test update()', () => {
  it('test all args', async () => {
    const result = await api.update({
      tableName: 'user',
      fields: {
        name: 'Urob',
        nick: 'huang',
        level: 11
      },
      where: {
        id: 1,
        password: 'test',
        level: 11
      }
    })
    console.log(result)
  })
  it('test without where', async () => {
    const result = await api.update({
      tableName: 'user',
      fields: {
        name: 'test',
        password: 'test'
      }
    }).catch(err => {
      assert.equal(err.message, 'miss setting where')
    })
  })
})

describe('test delete()', () => {
  it('test with one exp in where', async () => {
    const result = await api.delete({
      tableName: 'user',
      where: {
        id: 1
      }
    })
    console.log(result)
  })
  it('test with multi args in where but not match one', async () => {
    const result = await api.delete({
      tableName: 'user',
      where: {
        id: 2,
        nick: 'john',
        level: 11,
        name: 'Urob'
      }
    })
    console.log(result)
  })
  it('test with multi args in where and match one', async () => {
    const result = await api.delete({
      tableName: 'user',
      where: {
        id: 1,
        nick: 'huang',
        level: 11
      }
    })
    console.log(result)
  })
})