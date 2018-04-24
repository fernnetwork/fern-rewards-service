'use strict'

const host = process.env.PARITY_RPC || 'http://localhost:8545'
const address = process.env.DEPLOYER_ADDRESS || '0x00ea169ce7e0992960d3bde6f5d539c955316432'

const fs = require('fs')
const path = require('path')
const Web3 = require('web3')

const web3 = new Web3(host)
const eth = web3.eth
const gasLimit = 5000000

const targetDir = '../out'
const contractsDir = '../app/contracts'
const files = fs.readdirSync(path.join(__dirname, contractsDir))

  ; (async () => {
    const deployments = []

    files.forEach((fileName) => {
      const contractName = path.basename(fileName, '.json')
      const interf = require(`${contractsDir}/${contractName}.json`)['contracts'][`./contracts/${contractName}.sol:${contractName}`]
      const abi = JSON.parse(interf.abi)
      const bytecode = `0x${interf.bin}`
      const Contract = new eth.Contract(abi, { from: address, data: bytecode, gasLimit })

      const deployment = Contract.deploy().send({ from: address })
        .then((result) => {
          fs.writeFileSync(path.join(__dirname, targetDir, `address_${contractName}.txt`), result._address)
          console.log(`Contract ${contractName} deployed, address is: ${result._address}`)
        })

      deployments.push(deployment)
    })

    await Promise.all(deployments)
    console.log(`${deployments.length} contracts have been deployed to ${host}.`)
    process.exit(0)
  })()
