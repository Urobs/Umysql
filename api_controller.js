const fs = require('fs')
const join = require('path').join

function funcNameNormalize (filename) {
  const filenameArr = filename.split('_')
  for (let i = 1; i < filenameArr.length; i++) {
    const upperCaseStr = filenameArr[i][0].toUpperCase()
    filenameArr[i] = filenameArr[i].replace(/^\w/, upperCaseStr)
  }
  return filenameArr.join('')
}

function controlApi () {
  const apidirPath = join(__dirname, 'api')
  const apiList = fs.readdirSync(apidirPath)
  const api = {}
  apiList.forEach((val) => {
    const fullApiFucPath = join(apidirPath, val)
    let apiName = val.slice(0, val.length - 3)
    apiName = funcNameNormalize(apiName)
    api[apiName] = require(fullApiFucPath)
  })
  return api
}

module.exports = controlApi()