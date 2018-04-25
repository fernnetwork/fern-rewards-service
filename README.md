# Fern Rewards Service [![CircleCI](https://circleci.com/gh/fernnetwork/fern-rewards-service.svg?style=svg&circle-token=0789f9ddd90b58aee94a1dac3efee718ea0666c2)](https://circleci.com/gh/fernnetwork/fern-rewards-service)

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

### Paramenters
- `PARITY_WS`: (required) Parity websocket endpoint.
- `AUTHORITY_ADDRESS`: (required) Address of the authority.
- `REWARD_INTERVAL_SECONDS`: (required) Interval for triggering the `AuthorityIncentiveScheme`
- `REWARD_CONTRACT_ADDRESS`: (required) Address of the deployed `AuthorityIncentiveScheme` contract.
- `STORAGE_CONTRACT_ADDRESS`: (optional) Adddress of the deployed `SimpleStorage` contract. This is only required when running the transaction generator tool.

### Run with npm
1. Create .env file under the project directory, containing the required variables. See `.env.example`.
2. Run the reward service:
  ```
  $ npm i
  $ npm run start:dev
  ```

### Run with Docker
Replace the environment variables with your own and run the following command:
  ```
  $ docker pull fernnetwork/fern-rewards-service:latest
  $ docker run -d --name fern-rewards-service \
      -e PARITY_WS=ws://localhost:8546 \
      -e AUTHORITY_ADDRESS=0x06ecd9d5f588a57d6e696253f95265bd61bee378 \
      -e REWARD_INTERVAL_SECONDS=7 \
      -e REWARD_CONTRACT_ADDRESS=0x7504c71dB81c47F64444DcEbf9E8e4F714D5a969 \
      -e STORAGE_CONTRACT_ADDRESS=0xd91F2D1a5c6d774254B4519D5c63fCd05085D0E8 \
      fernnetwork/fern-rewards-service
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
