const escape = require('mysql').escape
const sqlApiError = require('../api_error')
const query = require('./query')

async function read (options) {
  const { tableName, fields } = options
  const where = options.where || null
  let sql = `SELECT ${fields ? escape(fields).replace(/'/g, '') : '*'}`
  sql += ` FROM ${tableName} `
  sql += `${where ? 'WHERE ' + escape(where).replace(/,/g, ' AND') : ''}`
  const result = await query(sql)
    .catch((err) => {
      console.log(err)
      throw new sqlApiError(err.errno, err.code)
    })
  return result
}

module.exports = read