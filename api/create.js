const escape = require('mysql').escape
const query = require('./query')
const sqlApiError = require('../api_error')

async function create (options) {
  const { tableName, fields } = options
  const sql = `INSERT INTO ${tableName} SET ${escape(fields)}`
  const dataList = await query(sql)
    .catch((err) => {
      console.log(err)
      throw new sqlApiError(err.errno, err.code)
    })
  return dataList
}
module.exports = create