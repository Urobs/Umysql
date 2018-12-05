const query = require('./query')
const sqlApiError = require('../api_error')

async function selectAllData (tableName) {
  const sql = `SELECT * FROM ${ tableName }`
  const dataList = await query(sql)
    .catch(err => {
      console.log(err)
      throw new sqlApiError(err.errno, err.code)
    })
  return dataList
}

module.exports = selectAllData