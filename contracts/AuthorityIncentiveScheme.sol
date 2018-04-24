pragma solidity ^0.4.18;

import "./includes/FernToken.sol";

contract AuthorityIncentiveScheme is FernToken {
  uint private lastClaimedBlock;
  uint private rewardAmount;
  address private creator;
  
  event AuthorityRewarded(address authority, uint balance, uint blockNumber);

  function AuthorityIncentiveScheme() public {
    creator = msg.sender;
    rewardAmount = 1;
  }

  function rewardMiner() public {
    uint currentBlockNumber = getBlockNumber();
    require(lastClaimedBlock != currentBlockNumber);

    address miner = getBlockCoinbase();
    transferReward(miner);

    lastClaimedBlock = currentBlockNumber;
    emit AuthorityRewarded(miner, balanceOf(miner), currentBlockNumber);
  }

  function transferReward(address miner) private returns (bool success) {
    require(balances[creator] >= rewardAmount);
    balances[creator] -= rewardAmount;
    balances[miner] += rewardAmount;
    emit Transfer(creator, miner, rewardAmount);
    return true;
  }

  function getBlockCoinbase() public view returns (address _coinbase) {
    return block.coinbase;
  }

  function getBlockNumber() public view returns (uint _blockNumber) {
    return block.number;
  }
}