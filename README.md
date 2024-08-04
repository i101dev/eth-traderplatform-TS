# Ethereum Token Platform

This repository contains Ethereum smart contracts for a decentralized trading platform. The platform consists of several Solidity contracts designed to facilitate token swaps, token management, order creation, and trading on the Ethereum blockchain.

## Contracts Overview

### 1. `MyToken.sol`

This contract implements an ERC20 token with additional functionalities like minting and purchasing tokens. It allows the creation and management of a custom token that can be used for trading within the platform.

### 2. `MySwap.sol`

This contract facilitates token swaps between ERC20 tokens and Ether. It allows users to buy tokens by sending Ether and forwards Ether to the contract owner.

### 3. `MyExchange.sol`

An OTC orderbook for ERC20 tokenns. This contract implements a decentralized exchange (DEX) where users can create, cancel, and fill orders to trade ERC20 tokens. It also supports depositing and withdrawing Ether and ERC20 tokens.

### 4. `FactionNFT.sol`

This contract implements a non-fungible token (NFT) representing factions. Users can mint and burn these NFTs, each associated with specific data. Additionally, the contract manages a related ERC-20 token (`MyToken`) used as a currency for minting the NFTs.

### 5. `GameNFT.sol`

This contract implements a game-based NFT platform. Users can create and join games by paying an entry fee (ante). The contract tracks game data, including players and winners, and manages an escrow for game funds. The winner of a game receives the accumulated escrow.

## Hardhat contract deployment

Requires a browser with metamask. You will be prompted to switch to the Hardhat local network.

`cd client`

`npm install`

`npx hardhat test`

`npx hardhat node`

### In a separate terminal:

`cd client`

`npx hardhat run ./scripts/deploy.js --network localhost`

`npm run dev`
