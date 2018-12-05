const fs = require('fs')
const path = require('path')
const getSqlMap = require('./get_sql_map')

const sqlContentMap = {}

function getSqlContent (fileName, path) {
  let content = fs.readFileSync(path, 'binary')
  sqlContentMap[fileName] = content
}

function getSqlContentMap () {
  let sqlMap = getSqlMap()
  sqlMap.forEach((filePath) => {
    const fileName = path.basename(filePath)
    getSqlContent(fileName, filePath)
  })
  return sqlContentMap
}

module.exports = getSqlContentMap