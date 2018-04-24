const { web3, accounts } = require('@appliedblockchain/bmono/web3')({
  accounts: 1,
  logger: console
})

const from = accounts[0].address
const gas = 50000000

const stringToHex = web3.utils.stringToHex
const hexToString = web3.utils.hexToString

let contract

web3.require('./SimpleStorage.sol')

afterAll(async () => {
  web3.close()
})

test('deploys', async () => {
  contract = await web3.deploy('SimpleStorage', [], { from, gas })
  expect(typeof contract.options.address).toBe('string')
})

test('stores value in storage', async () => {
  const value = stringToHex('foo')
  await contract.methods.set(value).send({ from })

  const result = await contract.methods.data().call()
  expect(hexToString(result)).toEqual('foo')
})
