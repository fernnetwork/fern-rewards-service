# Fern Rewards Service [![CircleCI](https://circleci.com/gh/appliedblockchain/fern-rewards-service.svg?style=svg&circle-token=07418305938c8b6845678298816a782826d7ca2d)](https://circleci.com/gh/appliedblockchain/fern-rewards-service)

Fern is an open protocol that encourages node distribution, provisioning and distributed services that help private networks to grow and build trust.

This repository contains a Proof of Concept for incentivising hosted nodes on a private network and rewarding them on a public network via an inter chain bridge (Parity Bridge).

## How does it work?
The fern reward system consists of an ERC-20 contract on a PoA network and a nodejs app - `fern-rewards-service` that ideally runs on every authority node in the network.

The `fern-rewards-service` triggers the `AuthorityIncentiveScheme` contract every x seconds. The smart contract checks for the miner of the latest block and transfers a reward to the mining authority node. The validation is done on chain in the smart contract, and reward for each block can only be distributed once.

## Getting Started

### Prerequisites
- node >= 8.10.0
- npm >= 5.8.0
- run `npm install`
- Access to the Parity RPC & pubsub API on the parity node
- `SimpleStorage` and `AuthorityIncentiveScheme` contracts must be deployed. See [Deploying the Smart Contracts](#deploying-the-smart-contracts).

### Steps
1. Create .env file containing the required variables. See `.env.example`.
  - `PARITY_WS`: parity websocket endpoint.
  - `AUTHORITY_ADDRESS`: address of the authority.
  - `REWARD_INTERVAL_SECONDS`: interval for triggering the `AuthorityIncentiveScheme`
  - `REWARD_CONTRACT_ADDRESS`: address of the deployed `AuthorityIncentiveScheme` contract.
  - `STORAGE_CONTRACT_ADDRESS`: adddress of the deployed `SimpleStorage` contract.

2. Run the reward service:
  - Using npm:
  ```
  $ npm i
  $ npm start
  ```
  - Using docker
  ```
  $ docker pull appliedblockchain/fern-rewards-service:latest
  $ docker run -d -v $(pwd)/.env:/app/.env \
                appliedblockchain/fern-rewards-service
  ```

## Deploying the Smart Contracts

### Prerequisites
- [Solidity compiler installed](http://solidity.readthedocs.io/en/latest/installing-solidity.html) >= 0.4.18
- node >= 8.10.0
- npm >= 5.8.0
- run `npm install`
- Access to Parity RPC on a parity node, with deployer account unlocked

### Steps
```
$ PARITY_RPC=<parity_rpc_url> DEPLOYER_ADDRESS=<deployer_address> npm run contract:deploy
```
