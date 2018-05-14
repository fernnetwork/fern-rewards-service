/**
 * A program that runs on the authority node to reward miners in the network via
 *  the FernRewardsToken contract.
 *
 * @author Jimmy Chen
 */
'use strict'

const { REWARD_INTERVAL_SECONDS } = require('./config')
const fernRewardsToken = require('./contracts/fernRewardsToken')
const rewardTracker = require('./utils/rewardTracker')

startRewardTask()
subscribeToRewardEvents()

function startRewardTask() {
  const rewardLoop = async () => {
    // Error is thrown when another authority has already called the function. Ignored
    try {
      await fernRewardsToken.rewardMiner()
    } catch (err) {
      console.debug('Error from smart contract ignored. Reward may have already been distributed for the block.')
    }

    setTimeout(rewardLoop, REWARD_INTERVAL_SECONDS * 1000)
  }

  rewardLoop()
}

function subscribeToRewardEvents() {
  fernRewardsToken.onAuthorityRewarded((error, event) => event && rewardTracker.logEvent(event))
}
