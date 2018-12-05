const query = require('./query')
const getSqlContentMap = require('../lib/get_sql_content_map')

const eventLog = function(err, sqlFile, index) {
  if (err) {
    console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败`)
  } else {
    console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功`)
  }
}

const initSql = async () =>  {
  const sqlContentMap = getSqlContentMap()
  for (let key in sqlContentMap) {
    const sqlShell = sqlContentMap[key]
    const sqlShellList = sqlShell.split(';')
    for (let [index, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        const result = await query(shell)
        if (result.serverStatus * 1 === 2) {
          eventLog(null, key, index)
        } else {
          eventLog(true, key, index)
        }
      }
    }
  }
  console.log('sql脚本执行结束')
}

module.exports = initSql