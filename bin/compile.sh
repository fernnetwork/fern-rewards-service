#!/bin/bash
source=./contracts
target=./app/contracts

rm -rf $target && mkdir -p $target

# contracts under includes/ are skipped
for file in $source/*.sol
do
  # exclude test mocks
  [[ $file == *Mock.sol ]] && continue
  baseName=$(basename "$file" .sol)
  solc --combined-json abi,bin ./contracts/$baseName.sol > $target/$baseName.json
done