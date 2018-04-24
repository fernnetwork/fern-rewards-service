'use strict'

const { REWARD_CONTRACT_ADDRESS, AUTHORITY_ADDRESS } = require('../config')
const contractName = 'AuthorityIncentiveScheme'
const web3Wrapper = require('../utils/web3Wrapper')
const contract = web3Wrapper.getContract(contractName, REWARD_CONTRACT_ADDRESS)

module.exports = {
  rewardMiner() {
    console.debug('Sending transaction to AuthorityIncentiveScheme.rewardMiner().')
    return contract.methods.rewardMiner().send({ from: AUTHORITY_ADDRESS })
  },

  onAuthorityRewarded(callback) {
    console.info('Subscribed to AuthorityIncentiveScheme.AuthorityRewarded event.')
    return contract.events.AuthorityRewarded(callback)
  }
}
