'use strict'

const { PARITY_WS } = require('../config')
const CONTRACTS_DIR = '../../contracts'

const Web3 = require('web3')
const web3 = new Web3(PARITY_WS)

module.exports = {
  web3,
  getContract: (contractName, contractAddress) => {
    const ref = `./contracts/${contractName}.sol:${contractName}`
    const interf = require(`${CONTRACTS_DIR}/${contractName}.json`).contracts[ref]
    const abi = JSON.parse(interf.abi)
    return new web3.eth.Contract(abi, contractAddress)
  }
}
