'use strict'
/**
 * Component for interacting with the FernRewardsToken smart contract.
 *
 * @author Jimmy Chen
 */
const { REWARD_CONTRACT_ADDRESS, AUTHORITY_ADDRESS } = require('../config')
const contractName = 'FernRewardsToken'
const web3Wrapper = require('../utils/web3Wrapper')
const contract = web3Wrapper.getContract(contractName, REWARD_CONTRACT_ADDRESS)

module.exports = {
  /**
   * Trigger the FernRewardsToken smart contract to reward miner of the latest block.
   * @returns {Promise} Promise object represents the result of the transaction.
   */
  rewardMiner() {
    console.debug('Sending transaction to FernRewardsToken.rewardMiner().')
    return contract.methods.rewardMiner().send({ from: AUTHORITY_ADDRESS })
  },

  /**
   * Register a callback on the AuthorityRewarded event.
   * @param {function} callback The event listener
   * @returns {object} The web3 event emitter object
   */
  onAuthorityRewarded(callback) {
    console.info('Subscribed to FernRewardsToken.AuthorityRewarded event.')
    return contract.events.AuthorityRewarded(callback)
  }
}
