/**
 * A testing utility that continuously generates randomised transactions on the SimpleStorage contract.
 *
 * @author Jimmy Chen
 */
const { AUTHORITY_ADDRESS, STORAGE_CONTRACT_ADDRESS } = require('../config')

const contractName = 'SimpleStorage'
const web3Wrapper = require('./web3Wrapper')
const web3 = web3Wrapper.web3
const simpleStorageContract = web3Wrapper.getContract(contractName, STORAGE_CONTRACT_ADDRESS)

const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms))
const randomInt = max => Math.floor(Math.random() * max)

const generateRandomizedTransaction = async () => {
  const value = web3.utils.stringToHex(`foo-${randomInt(10000)}`)
  const resultTx = await simpleStorageContract.methods.set(value).send({ from: AUTHORITY_ADDRESS })
  console.debug(`Set value on SimpleStorage contract. Transaction hash: ${resultTx.transactionHash}`)
}

const start = async () => {
  while (true) {
    await delay(randomInt(10000))
    await generateRandomizedTransaction()
  }
}

start()
