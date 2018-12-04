# Augur-subgraph
Subgraph for the Augur protocol 


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
