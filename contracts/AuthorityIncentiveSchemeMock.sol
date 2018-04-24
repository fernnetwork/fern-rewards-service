pragma solidity ^0.4.18;

import "./AuthorityIncentiveScheme.sol";

contract AuthorityIncentiveSchemeMock is AuthorityIncentiveScheme {
  
  uint blockNumber;
  address coinbase;

  function setBlockCoinbase(address _coinbase) public {
    coinbase = _coinbase;
  }

  function getBlockCoinbase() public view returns (address _coinbase) {
    return coinbase;
  }

  function setBlockNumber(uint _blockNumber) public {
    blockNumber = _blockNumber;
  }

  function getBlockNumber() public view returns (uint _blockNumber) {
    return blockNumber;
  }
}