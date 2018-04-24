'use strict'

const result = require('dotenv-safe').config()

if (result.error) {
  throw result.error
}

module.exports = result.parsed
