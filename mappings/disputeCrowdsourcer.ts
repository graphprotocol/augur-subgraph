// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import {store, Bytes, BigInt} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  DisputeCrowdsourcerCompleted,
  DisputeCrowdsourcerContribution,
  DisputeCrowdsourcerCreated,
  DisputeCrowdsourcerRedeemed
}
from '../types/Augur/Augur'

// Import entity types from the schema
import {DisputeCrowdsourcer, InitialReport} from '../types/schema'


export function handleDisputeCrowdsourcerCompleted(event: DisputeCrowdsourcerCompleted): void {
  let id = event.params.market.toHex()
  let dc = store.get("DisputeCrowdsourcer", id) as DisputeCrowdsourcer

  dc.completed = true

  store.set("DisputeCrowdsourcer", id, dc)
}

export function handleDisputeCrowdsourcerContribution(event: DisputeCrowdsourcerContribution): void {
  let id = event.params.market.toHex()
  let dc = store.get("DisputeCrowdsourcer", id) as DisputeCrowdsourcer

  let reporters = dc.reporters
  reporters.push(event.params.reporter)
  dc.reporters = reporters

  let amountStaked = dc.amountStaked
  amountStaked.push(event.params.amountStaked)
  dc.amountStaked = amountStaked


  store.set("DisputeCrowdsourcer", id, dc)
}

export function handleDisputeCrowdsourcerCreated(event: DisputeCrowdsourcerCreated): void {
  let id = event.params.market.toHex()
  let dc = new DisputeCrowdsourcer()

  dc.universe = event.params.universe
  dc.disputeCrowdsourcer = event.params.disputeCrowdsourcer
  dc.payoutNumerators = event.params.payoutNumerators
  dc.size = event.params.size
  dc.invalid = event.params.invalid
  dc.reporters = new Array<Bytes>()
  dc.amountStaked = new Array<BigInt>()
  dc.amountRedeemed = new Array<BigInt>()
  dc.repReceived = new Array<BigInt>()
  dc.reportingFeesReceived = new Array<BigInt>()

  store.set("DisputeCrowdsourcer", id, dc)
}


export function handleDisputeCrowdsourcerRedeemed(event: DisputeCrowdsourcerRedeemed): void {
  let id = event.params.market.toHex()
  let dc = store.get("DisputeCrowdsourcer", id) as DisputeCrowdsourcer

  let amountRedeemed = dc.amountRedeemed
  amountRedeemed.push(event.params.amountRedeemed)
  dc.amountRedeemed = amountRedeemed

  let repReceived = dc.repReceived
  repReceived.push(event.params.repReceived)
  dc.repReceived = repReceived

  let reportingFeesReceived = dc.reportingFeesReceived
  reportingFeesReceived.push(event.params.reportingFeesReceived)
  dc.reportingFeesReceived = reportingFeesReceived

  store.set("DisputeCrowdsourcer", id, dc)
}