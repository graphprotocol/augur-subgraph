// Import APIs from graph-ts
import {Bytes, BigInt} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  MarketCreated,
  MarketFinalized,
  MarketMailboxTransferred,
  MarketMigrated,
  MarketParticipantsDisavowed,
  MarketTransferred,
  ReportingParticipantDisavowed,
  CompleteSetsPurchased,
  CompleteSetsSold,
  TradingProceedsClaimed
} from '../types/Augur/Augur'

// Import entity types from the schema
import { Market, ClaimedTradingProceed, User } from '../types/schema'

export function handleMarketCreated(event: MarketCreated): void {
  let id = event.params.market.toHex()
  let market = new Market(id)

  market.topic = event.params.topic
  market.description = event.params.description
  market.extraInfo = event.params.extraInfo
  market.universe = event.params.universe
  market.marketCreator = event.params.marketCreator
  market.outcomes = event.params.outcomes
  market.marketCreationFee = event.params.marketCreationFee
  market.minPrice = event.params.minPrice
  market.maxPrice = event.params.maxPrice
  market.reportingParticipantDisavowed = new Array<Bytes>()
  market.marketOwners = new Array<Bytes>()
  market.marketMailboxOwners = new Array<Bytes>()
  market.completeSetPurchasers = new Array<Bytes>()
  market.numCompleteSetsPurchase = new Array<BigInt>()
  market.completeSetSellers = new Array<Bytes>()
  market.numCompleteSetsSold = new Array<BigInt>()
  market.tradingProceedsClaimed = new Array<string>()


  let marketTypeEnum = event.params.marketType
  let marketTypeName:string;
  if (marketTypeEnum == 0){
    marketTypeName = "Yes_No"
  } if (marketTypeEnum == 1){
    marketTypeName = "Categorical"
  } else {
    marketTypeName = "Scalar"
  }

  market.marketType = marketTypeName

  market.save()

  // User data below
  let userID = event.params.marketCreator.toHex()
  let user = User.load(userID)
  if (user == null){
    user = new User(userID)
    user.marketsCreated = new Array<Bytes>()
    user.claimedTrades = new Array<string>()
    user.initialReports = new Array<string>()
    user.disputeCrowdsourcers = new Array<Bytes>()
    user.ordersCreated = new Array<Bytes>()
    user.ordersCancelled = new Array<Bytes>()
    user.ordersFilled = new Array<Bytes>()
    user.tokensOwned = new Array<string>()
  }
  let mc = user.marketsCreated
  mc.push(event.params.market)
  user.marketsCreated = mc

  user.save()
}

// NOTE: original universe let out here. same question as before
// NOTE: Never emitted on mainnet
export function handleReportingParticpiantDisavowed(event: ReportingParticipantDisavowed): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  let reportingParticipants = market.reportingParticipantDisavowed
  reportingParticipants.push(event.params.reportingParticipant)
  market.reportingParticipantDisavowed = reportingParticipants

  market.save()
}


// QUESTION: does universe have to be checked too? I don't think so, because market addr is unique
export function handleMarketFinalized(event: MarketFinalized): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  market.finalized = true

  market.save()
}

// NOTE: original universe let out here. same queestion as before
// NOTE: Never emitted on mainnet
export function handleMarketMigrated(event: MarketMigrated): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  market.migrated = event.params.newUniverse

  market.save()
}

// NOTE: original universe let out here. same queestion as before
// NOTE: Never emitted on mainnet
export function handleMarketMailboxTransferred(event: MarketMailboxTransferred): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  let marketMailboxOwners = market.marketMailboxOwners
  marketMailboxOwners.push(event.params.to)
  market.marketMailboxOwners = marketMailboxOwners

  market.save()
}

// NOTE: original universe let out here. same question as before
// NOTE: Never emitted on mainnet
export function handleMarketParticipantsDisavowed(event: MarketParticipantsDisavowed): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  market.marketParticipantsDisavowed = true

  market.save()
}

// NOTE: original universe let out here. same question as before
// NOTE: Never emitted on mainnet
export function handleMarketTransferred(event: MarketTransferred): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  let marketOwners = market.marketOwners
  marketOwners.push(event.params.to)
  market.marketOwners = marketOwners

  market.save()
}

export function handleCompleteSetPurchased(event: CompleteSetsPurchased): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  let purchasers = market.completeSetPurchasers
  purchasers.push(event.params.account)
  market.completeSetPurchasers = purchasers

  let nums = market.numCompleteSetsPurchase
  nums.push(event.params.numCompleteSets)
  market.numCompleteSetsPurchase = nums

  market.save()
}

export function handleCompleteSetSold(event: CompleteSetsSold): void {
  let id = event.params.market.toHex()
  let market = Market.load(id)

  let sellers = market.completeSetSellers
  sellers.push(event.params.account)
  market.completeSetSellers = sellers

  let nums = market.numCompleteSetsSold
  nums.push(event.params.numCompleteSets)
  market.numCompleteSetsSold = nums

  market.save()
}

export function handleTradingProceedsClaimed(event: TradingProceedsClaimed): void {
  let id = event.params.market.toHex()
  let tpc = ClaimedTradingProceed.load(id)
  if (tpc == null) {
    tpc = new ClaimedTradingProceed(id)
  }
  tpc.universe = event.params.universe
  tpc.shareToken = event.params.shareToken
  tpc.sender = event.params.sender
  tpc.numShares = event.params.numShares
  tpc.numPayoutTokens = event.params.numPayoutTokens
  tpc.finalTokenBalance = event.params.finalTokenBalance

  tpc.save()

  // User data below
  let userID = event.params.sender.toHex()
  let user = User.load(userID)
  if (user == null){
    user = new User(userID)
    user.marketsCreated = new Array<Bytes>()
    user.claimedTrades = new Array<string>()
    user.initialReports = new Array<string>()
    user.disputeCrowdsourcers = new Array<Bytes>()
    user.ordersCreated = new Array<Bytes>()
    user.ordersCancelled = new Array<Bytes>()
    user.ordersFilled = new Array<Bytes>()
    user.tokensOwned = new Array<string>()
  }

  user.save()
}

