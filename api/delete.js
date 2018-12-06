const escape = require('mysql').escape
const query = require('../api/query')
const sqlApiError = require('../api_controller')

async function sqlDelete (options) {
  const { tableName, where } = options
  if (!where || where === {}) {
    throw new sqlApiError('unknow error no', 'miss setting where')
  }
  let sql = ``
  sql += `DELETE FROM ${tableName} `
  sql += `WHERE ${escape(where).replace(/,/g, ' AND')}`
  const result = await query(sql)
    .catch((err) => {
      console.log(err)
      throw new sqlApiError(err.errno, err.code)
    })
  return result
}

module.exports = sqlDelete