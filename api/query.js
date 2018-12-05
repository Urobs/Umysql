const mysql = require('mysql')
const mysqlConfig = require('../config').mysql
const pool = mysql.createPool(mysqlConfig)

function query (sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) { reject(err) }
      connection.query(sql, (err, rows) => {
        if (err) { reject(err) }
        resolve(rows)
        connection.release()
      })
    })
  })
}
module.exports = query