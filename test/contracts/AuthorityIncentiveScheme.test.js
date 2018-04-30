const { web3, accounts } = require('@appliedblockchain/bmono/web3')({
  accounts: 3,
  logger: console
})

const creator = accounts[0].address
const authority1 = accounts[1].address
const authority2 = accounts[2].address
const gas = 50000000

let contract

web3.require('./AuthorityIncentiveSchemeMock.sol')

afterAll(async () => {
  web3.close()
})

test('deploys', async () => {
  contract = await web3.deploy('AuthorityIncentiveSchemeMock', [], { from: creator, gas })
  expect(typeof contract.options.address).toBe('string')
})

test('the initial fern token supply is 10000000000000000000000000000', async () => {
  const totalSupply = await contract.methods.totalSupply().call()
  expect(totalSupply).toEqual('10000000000000000000000000000')
})

test('the initial account balacne of authority is 0', async () => {
  await expect(balanceOf(authority1)).resolves.toEqual('0')
  await expect(balanceOf(authority2)).resolves.toEqual('0')
})

test('rewards token to current block miner', async () => {
  let authorityRewardEvent
  contract.once('AuthorityRewarded', (err, event) => {
    authorityRewardEvent = event.returnValues
  })
  // Given a new block is mined by authority1
  await contract.methods.setBlockCoinbase(authority1).send({ from: creator })
  await contract.methods.setBlockNumber('130').send({ from: creator })
  // When
  await contract.methods.rewardMiner().send({ from: authority1 })
  // Then miner (authority2) balance is increased
  await expect(balanceOf(authority1)).resolves.toEqual('1')
  await expect(balanceOf(authority2)).resolves.toEqual('0')
  // AND event is emitted
  expect(authorityRewardEvent.authority).toEqual(authority1)
  expect(authorityRewardEvent.balance).toEqual('1')
  expect(authorityRewardEvent.blockNumber).toEqual('130')
})

test('must not pay reward for the same block twice', async () => {
  // Given still on same block
  await contract.methods.setBlockCoinbase(authority1).send({ from: creator })
  await contract.methods.setBlockNumber('130').send({ from: creator })
  // When
  const result = contract.methods.rewardMiner().send({ from: authority1 })
  // Then
  await expect(result).rejects.toThrow()
})

test('reward can be claimed on a new block', async () => {
  // Given a new block is mined by authority2
  await contract.methods.setBlockCoinbase(authority2).send({ from: creator })
  await contract.methods.setBlockNumber('131').send({ from: creator })
  // When
  await contract.methods.rewardMiner().send({ from: authority1 })
  // Then miner (authority2) balance is increased
  await expect(balanceOf(authority1)).resolves.toEqual('1')
  await expect(balanceOf(authority2)).resolves.toEqual('1')
})

function balanceOf(address) {
  return contract.methods.balanceOf(address).call()
}
