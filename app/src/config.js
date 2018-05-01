'use strict'
/**
 * Reads predefined configurations from environment variables and expose as a config object to other components.
 *
 * @author Jimmy Chen
 */
const configItems = [
  { name: 'PARITY_WS' },
  { name: 'AUTHORITY_ADDRESS' },
  { name: 'REWARD_CONTRACT_ADDRESS' },
  { name: 'REWARD_INTERVAL_SECONDS' },
  { name: 'STORAGE_CONTRACT_ADDRESS', optional: true }
]

const config = {}
const missing = []

for (const item of configItems) {
  const name = item.name

  if (process.env[name]) {
    config[name] = process.env[name]
  } else if (!item.optional) {
    missing.push(name)
  }
}

if (missing.length !== 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
}

module.exports = config
