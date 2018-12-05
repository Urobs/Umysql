class SqlAPIError extends Error {
  constructor (errno, code) {
    super (code)
    this.errno = errno
  }
}

module.exports = SqlAPIError