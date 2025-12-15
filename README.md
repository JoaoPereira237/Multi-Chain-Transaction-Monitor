# Multi-Chain Transaction Monitor

Backend system that monitors transactions across multiple blockchains (Ethereum and Bitcoin), providing a unified API for querying transaction data.

## Tech Stack
- Node.js + TypeScript
- Express
- ethers.js / bitcoinjs-lib
- PostgreSQL
- Redis
- Golang (indexer service)

## Architecture
- Ethereum Service: monitors Ethereum transactions
- Bitcoin Service: monitors Bitcoin transactions
- API Gateway: exposes REST API
- Go Indexer: concurrent block indexing

## Features
- Multi-chain support
- Transaction persistence
- Caching with Redis
- Resilient RPC handling
- Unit and integration tests

## Getting Started
1. Start infrastructure:
```bash
docker-compose up -d
