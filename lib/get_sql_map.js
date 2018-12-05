const fs = require('fs')
const join = require('path').join

function getSqlMap() {
  const sqlFileDir = join(__dirname, 'sql')
  let fileList = fs.readdirSync(sqlFileDir)
  let sqlFileList = []
  fileList.map((file) => {
    if (file.indexOf('.sql') >= 0) {
      exactPath = join(sqlFileDir, file).replace(/\\/g, '/')
      sqlFileList.push(exactPath)
    } 
  })
  return sqlFileList
}

module.exports = getSqlMap