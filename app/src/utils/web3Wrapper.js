'use strict'
/**
 * Wrapper for a web3 instance created using the configured API endpoint.
 *
 * @author Jimmy Chen
 */
const { PARITY_WS } = require('../config')
const CONTRACTS_DIR = '../../contracts'

const Web3 = require('web3')
const web3 = new Web3(PARITY_WS)

module.exports = {
  web3,
  /**
   * Create a new instance of the web3.eth.Contract object from a given contract name and address.
   * @returns {object} A web3.eth.Contract instance
   */
  getContract: (contractName, contractAddress) => {
    const ref = `./contracts/${contractName}.sol:${contractName}`
    const interf = require(`${CONTRACTS_DIR}/${contractName}.json`).contracts[ref]
    const abi = JSON.parse(interf.abi)
    return new web3.eth.Contract(abi, contractAddress)
  }
}
