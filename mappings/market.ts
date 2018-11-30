// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import { store, Bytes } from '@graphprotocol/graph-ts'

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
import { Market, ClaimedTradingProceeds } from '../types/schema'

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
  market.marketOwners = new Array<Bytes>()
  market.reportingParticipantDisavowed = new Array<Bytes>()

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
}

// NOTE: original universe let out here. same question as before
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

