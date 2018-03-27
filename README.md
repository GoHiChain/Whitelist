# Whitelist Smart Contract

This is an example of a Whitelist smart contract on Ethereum. We have packaged it into a truffle project.

As a kind of disclaimer, here you have some version info in case you have problems replaying any recipe.

```
# truffle --version
Truffle v4.1.3 - a development framework for Ethereum

```

My current **solc** compiler version is:
```
# npm show solc
{ name: 'solc',
   description: 'Solidity compiler',
     'dist-tags': { latest: '0.4.21' },

[...]

```


## Getting started

As can be seen, **truffle.js** points to an ethereum node listening on **localhost:7545**. Let's start our **testrpc testnet** on this port.

```sh
testrpc -m "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt" \
    -p 7545

```

__NOTE__: I recommend testing with a fixed passphrase. I find valuable that the addresses be familiar for me during the tests.

## Deploying the contract

Cloning the repo and deploying once

```sh
git clone git@github.com:hidalgocespedes/Whitelist.git
cd Whitelist 
truffle compile   //migrate will also compile if you miss this step
```

The deploy will be done over the testnet you select. Saying nothing, it will be done over the development one:


```
# truffle migrate
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/Ownable.sol...
Compiling ./contracts/WhiteList.sol...
Writing artifacts to ./build/contracts

Using network 'development'.

Running migration: 1_initial_migration.js
Deploying Migrations...
... 0xfcc7319c2cba3d321666ab05877780fb794d286a9467b816af88b8144fb130eb
Migrations: 0x0922f94216d5acc766e8d5c98e993a286b64362c
Saving successful migration to network...
... 0xa2f3f8533f1b4e43d24101c9180272646013878cc230ef4ae2496a4ce1586a11
Saving artifacts...
Running migration: 2_deploy_contracts.js
Deploying WhiteList...
... 0x5e2bd6c1c99aecd9248950132c82923d126256f51ba2ac84c5a9335d2590e0b7
WhiteList: 0x215470018822fca9b4f079b51f32a40f5d6566d8
Saving successful migration to network...
... 0x2485f73c41b7d4b77a8d9776a8c1c5b1d8b3975b93c7f8025ff68054f2332f21
Saving artifacts...



```

This is not a truffle tutorial, but it can be interesting for you that the contract's addresses are always the same within the terms described in this README. 



## Testing the contract


### Checking any known address to be whitelisted


```
# truffle test test/showWhiteList.js 
Using network 'development'.


Contract: WhiteList
✓ Checking any knwon address to be whitelisted


1 passing (50ms)

Is the address 0xb9c45821527cddc6809b04f57e5757496614c5ef whitelisted ? false
Is the address 0xdf1f621f895406bec9f87962e0750926c60b0020 whitelisted ? false
Is the address 0xd556172ea025071d81a446395f11fcc8e809350b whitelisted ? false
Is the address 0xdb19ada69cc2ad1c12e4f5a480eb4f93b51f6b82 whitelisted ? false
Is the address 0x941c274d3855517906c21de7863e9c8db894ce42 whitelisted ? false
Is the address 0x988c32d7020390dc745dcfae451675edd2c685d6 whitelisted ? false
Is the address 0x04fdcec40a558981861cbed54a91183fa2424701 whitelisted ? false
Is the address 0x9737a434ca4cb426238a63549f2136f2037abf34 whitelisted ? false
Is the address 0x4aefa4b58588cd6d6b777e5315f7fa7fe39ae251 whitelisted ? false
Is the address 0xa19f37dd300438e1b41554edd6de75985b00c50b whitelisted ? false

```


### Filling and checking the Whitelist 
```
# truffle test test/fillWhiteList.js 
Using network 'development'.

Test javascript, whitelist


Contract: WhiteList
whitelist
(0) Is 0xb9c45821527cddc6809b04f57e5757496614c5ef whitelisted ? false
(1) Is 0xdf1f621f895406bec9f87962e0750926c60b0020 whitelisted ? false
(2) Is 0xd556172ea025071d81a446395f11fcc8e809350b whitelisted ? false
(3) Is 0xdb19ada69cc2ad1c12e4f5a480eb4f93b51f6b82 whitelisted ? false
(4) Is 0x941c274d3855517906c21de7863e9c8db894ce42 whitelisted ? false
(5) Is 0x988c32d7020390dc745dcfae451675edd2c685d6 whitelisted ? false
(6) Is 0x04fdcec40a558981861cbed54a91183fa2424701 whitelisted ? false
(7) Is 0x9737a434ca4cb426238a63549f2136f2037abf34 whitelisted ? false
(8) Is 0x4aefa4b58588cd6d6b777e5315f7fa7fe39ae251 whitelisted ? false
(9) Is 0xa19f37dd300438e1b41554edd6de75985b00c50b whitelisted ? false

✓ Addition of addresses 1,2,5,9 to the whitelist (272ms)
(0) Is 0xb9c45821527cddc6809b04f57e5757496614c5ef whitelisted ? false
(1) Is 0xdf1f621f895406bec9f87962e0750926c60b0020 whitelisted ? true
(2) Is 0xd556172ea025071d81a446395f11fcc8e809350b whitelisted ? true
(3) Is 0xdb19ada69cc2ad1c12e4f5a480eb4f93b51f6b82 whitelisted ? false
(4) Is 0x941c274d3855517906c21de7863e9c8db894ce42 whitelisted ? false
(5) Is 0x988c32d7020390dc745dcfae451675edd2c685d6 whitelisted ? true
(6) Is 0x04fdcec40a558981861cbed54a91183fa2424701 whitelisted ? false
(7) Is 0x9737a434ca4cb426238a63549f2136f2037abf34 whitelisted ? false
(8) Is 0x4aefa4b58588cd6d6b777e5315f7fa7fe39ae251 whitelisted ? false
(9) Is 0xa19f37dd300438e1b41554edd6de75985b00c50b whitelisted ? true

✓ Checking that a non-owner sender cannot add the address 6 to the whitelist (186ms)
✓ Whitelist
(0) Is 0xb9c45821527cddc6809b04f57e5757496614c5ef whitelisted ? false
(1) Is 0xdf1f621f895406bec9f87962e0750926c60b0020 whitelisted ? true
(2) Is 0xd556172ea025071d81a446395f11fcc8e809350b whitelisted ? true
(3) Is 0xdb19ada69cc2ad1c12e4f5a480eb4f93b51f6b82 whitelisted ? false
(4) Is 0x941c274d3855517906c21de7863e9c8db894ce42 whitelisted ? false
(5) Is 0x988c32d7020390dc745dcfae451675edd2c685d6 whitelisted ? true
(6) Is 0x04fdcec40a558981861cbed54a91183fa2424701 whitelisted ? false
(7) Is 0x9737a434ca4cb426238a63549f2136f2037abf34 whitelisted ? false
(8) Is 0x4aefa4b58588cd6d6b777e5315f7fa7fe39ae251 whitelisted ? false
(9) Is 0xa19f37dd300438e1b41554edd6de75985b00c50b whitelisted ? true

✓ Checking that a non-owner cannot remove 1 from the whitelist (145ms)
✓ whitelist
(0) Is 0xb9c45821527cddc6809b04f57e5757496614c5ef whitelisted ? false
(1) Is 0xdf1f621f895406bec9f87962e0750926c60b0020 whitelisted ? true
(2) Is 0xd556172ea025071d81a446395f11fcc8e809350b whitelisted ? true
(3) Is 0xdb19ada69cc2ad1c12e4f5a480eb4f93b51f6b82 whitelisted ? false
(4) Is 0x941c274d3855517906c21de7863e9c8db894ce42 whitelisted ? false
(5) Is 0x988c32d7020390dc745dcfae451675edd2c685d6 whitelisted ? true
(6) Is 0x04fdcec40a558981861cbed54a91183fa2424701 whitelisted ? false
(7) Is 0x9737a434ca4cb426238a63549f2136f2037abf34 whitelisted ? false
(8) Is 0x4aefa4b58588cd6d6b777e5315f7fa7fe39ae251 whitelisted ? false
(9) Is 0xa19f37dd300438e1b41554edd6de75985b00c50b whitelisted ? true


✓ Checking the owner can remove the address 5 from the whitelist (158ms)
✓ whitelist
✓ Fihal check. Only 1,2 & 9 have to be whitelisted
(0) Is 0xb9c45821527cddc6809b04f57e5757496614c5ef whitelisted ? false
(1) Is 0xdf1f621f895406bec9f87962e0750926c60b0020 whitelisted ? true


     9 passing (908ms)

(2) Is 0xd556172ea025071d81a446395f11fcc8e809350b whitelisted ? true
(3) Is 0xdb19ada69cc2ad1c12e4f5a480eb4f93b51f6b82 whitelisted ? false
(4) Is 0x941c274d3855517906c21de7863e9c8db894ce42 whitelisted ? false
(5) Is 0x988c32d7020390dc745dcfae451675edd2c685d6 whitelisted ? false
(6) Is 0x04fdcec40a558981861cbed54a91183fa2424701 whitelisted ? false
(7) Is 0x9737a434ca4cb426238a63549f2136f2037abf34 whitelisted ? false
(8) Is 0x4aefa4b58588cd6d6b777e5315f7fa7fe39ae251 whitelisted ? false
(9) Is 0xa19f37dd300438e1b41554edd6de75985b00c50b whitelisted ? true

```


NOTE: As you must know, javascript and async programming can produce unexpected sequences. Well, the key is the coherence of the result but it can be a bit disturbing if you get an output  too much chaotic. In this case is acceptable.  Future versions will fix this annoying effects.

