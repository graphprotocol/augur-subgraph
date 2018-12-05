# Augur-subgraph
Subgraph for the Augur protocol 


## Source Code

We are using the exact source code and abi from [etherscan](https://etherscan.io/address/0x75228dce4d82566d93068a8d5d49435216551599#code), as the code from the master branch on github is updated, as Augur was launched on mainnet months ago. 

## Query

{
  markets(first: 5){
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
  }
  claimedTradingProceeds(first: 5) {
    id
    universe
    shareToken
    sender
    numShares
    numPayoutTokens
    finalTokenBalance
  }
}
