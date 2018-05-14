pragma solidity ^0.4.23;

contract SimpleStorage {
  bytes32 public data;

  function set(bytes32 _data) public {
    data = _data;
  }
}
