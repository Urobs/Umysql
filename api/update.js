const escape = require('mysql').escape
const sqlApiError = require('../api_error')
const query = require('./query')

async function update (options) {
  const { tableName, fields, where } = options
  if (!where || where === {}) {
    throw new sqlApiError('unknow error no', 'miss setting where')
  }
  let sql = ``
  sql += `UPDATE ${tableName} `
  sql += `SET ${escape(fields)} `
  sql += `WHERE ${escape(where).replace(/,/g, ' AND')}`
  const result = await query(sql)
    .catch(err => {
      console.log(err)
      throw new sqlApiError(err.errno, err.code)
    })
  return result
}

module.exports = update