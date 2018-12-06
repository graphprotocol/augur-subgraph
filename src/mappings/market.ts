// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import { store, Bytes, BigInt} from '@graphprotocol/graph-ts'

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
  let market = new Market()

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

  store.set('Market', id, market)

  // User data below
  let userID = event.params.marketCreator.toHex()
  let user = store.get("User", userID) as User |null
  if (user == null){
    user = new User()
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

  store.set("User", userID, user as User)
}

// NOTE: original universe let out here. same question as before
// NOTE: Never emitted on mainnet
export function handleReportingParticpiantDisavowed(event: ReportingParticipantDisavowed): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  let reportingParticipants = market.reportingParticipantDisavowed
  reportingParticipants.push(event.params.reportingParticipant)
  market.reportingParticipantDisavowed = reportingParticipants

  store.set("Market", id, market)
}


// QUESTION: does universe have to be checked too? I don't think so, because market addr is unique
export function handleMarketFinalized(event: MarketFinalized): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  market.finalized = true

  store.set("Market", id, market)
}

// NOTE: original universe let out here. same queestion as before
// NOTE: Never emitted on mainnet
export function handleMarketMigrated(event: MarketMigrated): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  market.migrated = event.params.newUniverse

  store.set("Market", id, market)
}

// NOTE: original universe let out here. same queestion as before
// NOTE: Never emitted on mainnet
export function handleMarketMailboxTransferred(event: MarketMailboxTransferred): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  let marketMailboxOwners = market.marketMailboxOwners
  marketMailboxOwners.push(event.params.to)
  market.marketMailboxOwners = marketMailboxOwners

  store.set("Market", id, market)
}

// NOTE: original universe let out here. same question as before
// NOTE: Never emitted on mainnet
export function handleMarketParticipantsDisavowed(event: MarketParticipantsDisavowed): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  market.marketParticipantsDisavowed = true

  store.set("Market", id, market)
}

// NOTE: original universe let out here. same question as before
// NOTE: Never emitted on mainnet
export function handleMarketTransferred(event: MarketTransferred): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  let marketOwners = market.marketOwners
  marketOwners.push(event.params.to)
  market.marketOwners = marketOwners

  store.set("Market", id, market)
}

export function handleCompleteSetPurchased(event: CompleteSetsPurchased): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  let purchasers = market.completeSetPurchasers
  purchasers.push(event.params.account)
  market.completeSetPurchasers = purchasers

  let nums = market.numCompleteSetsPurchase
  nums.push(event.params.numCompleteSets)
  market.numCompleteSetsPurchase = nums

  store.set("Market", id, market)
}

export function handleCompleteSetSold(event: CompleteSetsSold): void {
  let id = event.params.market.toHex()
  let market = store.get("Market", id) as Market

  let sellers = market.completeSetSellers
  sellers.push(event.params.account)
  market.completeSetSellers = sellers

  let nums = market.numCompleteSetsSold
  nums.push(event.params.numCompleteSets)
  market.numCompleteSetsSold = nums

  store.set("Market", id, market)
}

export function handleTradingProceedsClaimed(event: TradingProceedsClaimed): void {
  let id = event.params.market.toHex()
  let tpc = store.get("ClaimedTradingProceed", id) as ClaimedTradingProceed | null
  if (tpc == null) {
    tpc = new ClaimedTradingProceed()
  }
  tpc.universe = event.params.universe
  tpc.shareToken = event.params.shareToken
  tpc.sender = event.params.sender
  tpc.numShares = event.params.numShares
  tpc.numPayoutTokens = event.params.numPayoutTokens
  tpc.finalTokenBalance = event.params.finalTokenBalance

  store.set("ClaimedTradingProceed", id, tpc as ClaimedTradingProceed)

  // User data below
  let userID = event.params.sender.toHex()
  let user = store.get("User", userID) as User |null
  if (user == null){
    user = new User()
    user.marketsCreated = new Array<Bytes>()
    user.claimedTrades = new Array<string>()
    user.initialReports = new Array<string>()
    user.disputeCrowdsourcers = new Array<Bytes>()
    user.ordersCreated = new Array<Bytes>()
    user.ordersCancelled = new Array<Bytes>()
    user.ordersFilled = new Array<Bytes>()
    user.tokensOwned = new Array<string>()
  }

  store.set("User", userID, user as User)
}

