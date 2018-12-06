# Augur-subgraph
Subgraph for the Augur protocol 


## Source Code

We are using the exact source code and abi from [etherscan](https://etherscan.io/address/0x75228dce4d82566d93068a8d5d49435216551599#code), as the code from the master branch on github is updated, as Augur was launched on mainnet months ago. 

## Query

Below is a list of all possibly queries. There are five high level queries - `market`, `universe`, `order`, `tokens`, `users`. There are entities nested within these queries as well. 

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

}
