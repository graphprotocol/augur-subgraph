# Augur Subgraph

This is a subgraph for [Augur](https://github.com/AugurProject/augur).

## Events and Contracts

The Augur smart contracts are set up so that all the events are emitted from a single address. The solidity file that has all the events is `Augur.sol`.

We are using the exact source code and abi from [etherscan](https://etherscan.io/address/0x75228dce4d82566d93068a8d5d49435216551599#code), as the code from the master branch on github is updated, as Augur was launched on mainnet months ago. 

Most events are included and tracked in the subgraph. The following events were not tracked:

* `DisputeWindowCreated` - Exists in the most up to date master branch, but doesn't exist on the live version on mainnet yet. 
* `EscapeHatchChanged` - Not essential to Dapp user experience
* `TimestampSet` - Not essential to Dapp user experience
* `FeeWindowRedeemed` - Exists in the current live version, but has been removed from the most up to date master branch
* `FeeWindowCreated` - Exists in the current live version, but has been removed from the most up to date master branch



This can be used for the mainnet Augur, and all testnets. In order to do
so the `subgraph.yaml` file will need to have the contract addresses changed to point to the 
correct address for each respective network. It is typical to test on the Rinkeby testnet, since that is the network that has a browser Dapp accessible over the internet. All other testnets can be accessed by downloading the Augur desktop application. 

The subgraph can take somewhere in the range of 3-5 hours when syncing all events, including token transfers of REP, which take a long time to process. If the token minting and transfers are commented out (recommended for quick testing), the subgraph takes about 20-30 minutes to ingest all the events when connected to Infura for mainnet. 


## Brief Description of The Graph Node Setup

A Graph Node can run multiple subgraphs. The subgraph ingests event data by calling to Infura through http. It can also connect to any geth node or parity node that accepts RPC calls. Fast synced geth nodes work. To use parity, the `--no-warp` flag must be used. Setting up a local Ethereum node is more reliable and faster, but Infura is the easiest way to get started. 

This subgraph has three types of files which tell the Graph Node to ingest events from specific contracts. They are:
* The subgraph manifest (subgraph.yaml)
* A GraphQL schema      (schema.graphql)
* Mapping scripts       (augur.ts, disputeCrowdsourcer.ts, disputeWindow.ts, initialReport.ts, market.ts, order.ts, token.ts, universe.ts) 

This repository has these files created and ready to compile, so a user can start this subgraph on their own. The only thing that needs to be edited is the contract addresses in the `subgraph.yaml` file to change between mainnet and testnets.  

We have provided a quick guide on how to start up the Augur-Subgraph graph node below. If these steps aren't descriptive enough, the [getting started guide](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) has in depth details on running a subgraph. 

## Steps to Deploy The Augur Subgraph Locally 
  1. Install IPFS and run `ipfs init` followed by `ipfs daemon`
  2. Install PostgreSQL and run `initdb -D .postgres` followed by `pg_ctl -D .postgres start` and `createdb graph-node-mainnet` (note this db name is used in the commands below for the mainnet examples)
  3. If using Ubuntu, you may need to install additional packages: `sudo apt-get install -y clang libpq-dev libssl-dev pkg-config`
  4. Clone this repository, and run the following:
     * `yarn`
     * `yarn codegen` 
  5. Clone https://github.com/graphprotocol/graph-node from master and `cargo build` (this might take a while)
  6. a) Now that all the dependencies are running, you can run the following command to connect to Infura Mainnet (it may take a few minutes for Rust to compile). Password might be optional, it depends on your postrgres setup:

```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/graph-node-mainnet \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-infura:https://mainnet.infura.io --debug
```
  6. b) Or Mainnet with a Local Ethereum node. This is very common if you are working with brand new contracts, and you have deployed them to a testnet environment like *ganache* (note that ganache commonly uses port 9545 rather than 8545):
  ```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/graph-node-mainnet \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-local:http://127.0.0.1:8545 
```
  6. c) Or Infura Rinkeby _(NOTE: Infura testnets are not reliable right now, we get inconsistent results returned. If Rinkeby data is needed, it is suggested to run your own Rinkeby node)_
```
    cargo run -p graph-node --release --   \
    --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/graph-node-testnet \
    --ipfs 127.0.0.1:5001 \
    --ethereum-rpc rinkeby-infura:https://rinkeby.infura.io 

```
  
 7. Now create the subgraph locally on The Graph Node with `yarn create-local`. On The Graph Hosted service, creating the subgraph is done in the web broswer. 

  
 8. Now deploy the Augur subgraph to The Graph Node with `yarn deploy --debug`. You should see a lot of blocks being skipped in the `graph-node` terminal, and then it will start ingesting events from the moment the contracts were uploaded to the network. 

Now that you have subgraph is running you may open a [Graphiql](https://github.com/graphql/graphiql) browser at `127.0.0.1:8000` and get started with querying.

## Viewing the Subgraph on the Graph Hosted Service
This subgraph is not yet on [The Graph Explorer](https://thegraph.com/explorer/). To understand how deploying to the hosted service works, check out the [Deploying Instructions](https://thegraph.com/docs/deploy-a-subgraph) in the official documentation. The most important part of deploying to the hosted service is ensuring that the npm script for `deploy` is updated to the correct name that you want to deploy with. 

## Getting started with querying 

Below are a few ways to show how to query the Augur-Subgraph for data. 

### Querying all possible data that is stored in the subgraph
The query below shows all the information that is possible to query, but is limited to the first 5 instances. There are many other filtering options that can be used, just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).

There are five high level queries - `market`, `universe`, `order`, `tokens`, `users`. There are entities nested within these queries as well. 

```
{
  markets(first: 100) {
    id
    topic
    description
    extraInfo
    universe
    marketCreator
    outcomes
    marketCreationFee
    minPrice
    maxPrice
    marketType
    reportingParticipantDisavowed
    marketParticipantsDisavowed
    finalized
    migrated
    numCompleteSetsPurchase
    numCompleteSetsSold
    marketOwners
    marketMailboxOwners
    completeSetPurchasers
    completeSetSellers
    tradingProceedsClaimed {
      id
      universe
      shareToken
      sender
      numShares
      numPayoutTokens
      finalTokenBalance
    }
    initialReports {
      id
      universe
      amountStaked
      isDesignatedReporter
      payoutNumerators
      invalid
      reporter
      amountRedeemed
      repReceived
      reportingFeesReceived
    }
    disputeCrowdsourcer {
      id
      universe
      disputeCrowdsourcer
      payoutNumerators
      size
      invalid
      reporters
      amountStaked
      dcc
      completed
      amountRedeemed
      repReceived
      reportingFeesReceived
      payoutNumerators2
    }
  }
  universes {
    id
    parentUniverse
    payoutNumerators
    forked
    invalid
  }
  orders {
    id
    orderType
    amount
    price
    creator
    moneyEscrowed
    sharesEscrowed
    tradeGroupIDCreator
    universe
    shareToken
    canceller
    tokenRefund
    sharesRefund
    filler
    numCreatorShares
    numCreatorTokens
    numFillerShares
    numFillerTokens
    marketCreatorFees
    reporterFees
    amountFilled
    tradeGroupIDFilled
  }
  tokens(first: 10) {
    id
    universe
    market
    tokenType
    owners {
      id
      tokenAddress
      amount
    }
  }
  users(first: 10) {
    id
    marketsCreated
    claimedTrades {
      id
      universe
      shareToken
      sender
      numShares
      numPayoutTokens
      finalTokenBalance
    }
    initialReports {
      id
      universe
      amountStaked
      isDesignatedReporter
      payoutNumerators
      invalid
      reporter
      amountRedeemed
      repReceived
      reportingFeesReceived
    }
    disputeCrowdsourcers
    ordersCreated
    ordersCancelled
    ordersFilled
    tokensOwned {
      id
      tokenAddress
      amount
    }
  }
}

```
The command above can be copy pasted into the Graphiql interface in your browser at `127.0.0.1:8000`.

