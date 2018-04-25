'use strict'

const vars = [
  'PARITY_WS',
  'AUTHORITY_ADDRESS',
  'REWARD_CONTRACT_ADDRESS',
  'REWARD_INTERVAL_SECONDS',
  'STORAGE_CONTRACT_ADDRESS'
]

const config = {}
const missing = []

for (let key of vars) {
  if (!process.env[ key ]) {
    missing.push(key)
  } else {
    config[ key ] = process.env[ key ]
  }
}

if (missing.length !== 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
}

module.exports = config
