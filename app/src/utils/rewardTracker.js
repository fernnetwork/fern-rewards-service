'use strict'
/**
 * Analyses the AuthorityRewarded event from AuthorityIncentiveScheme contract and output
 *  to the console. Logs errors in unexpected scenarios such as duplicate rewarding.
 *
 * @author Jimmy Chen
 */
const { REWARD_INTERVAL_SECONDS } = require('../config')
let lastRewardedBlock

const logEvent = (event) => {
  const { authority, blockNumber } = event.returnValues
  const blockNum = Number(blockNumber)

  console.info(`Authority ${authority} rewarded for mining block ${blockNum}.`)

  if (lastRewardedBlock === blockNum) {
    console.error(duplicateRewardError(blockNum))
  }

  if (lastRewardedBlock && lastRewardedBlock !== (blockNum - 1)) {
    console.warn(rewardMissedMsg(blockNum))
  }

  lastRewardedBlock = blockNum
}

function rewardMissedMsg(blockNumber) {
  return `No AuthorityRewarded event received between blocks ${lastRewardedBlock} to ${blockNumber}. Current reward interval is ${REWARD_INTERVAL_SECONDS} seconds.`
}

function duplicateRewardError(blockNumber) {
  return `CRITICAL!! Reward for block ${blockNumber} has been claimed more than once. This is a bug in the contract.`
}

module.exports = { logEvent }
