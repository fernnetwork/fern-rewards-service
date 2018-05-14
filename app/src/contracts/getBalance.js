'use strict'
/**
 * Component for interacting with the FernRewardsToken smart contract.
 *
 * @author Jimmy Chen
 */
const { REWARD_CONTRACT_ADDRESS } = require('../config')
const contractName = 'FernRewardsToken'
const web3Wrapper = require('../utils/web3Wrapper')
const contract = web3Wrapper.getContract(contractName, REWARD_CONTRACT_ADDRESS)

const getBalance = async () => {
  const balance = await contract.methods.balanceOf('0x00ea169ce7e0992960d3bde6f5d539c955316432').call()
  console.log(balance)
  process.exit(0)
}

getBalance()
