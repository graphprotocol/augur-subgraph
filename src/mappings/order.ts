// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import {store, Bytes, BigInt} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  OrderCanceled,
  OrderCreated,
  OrderFilled
} from '../types/Augur/Augur'

// Import entity types from the schema
import {Order} from '../types/schema'

export function handleOrderCanceled(event: OrderCanceled): void {
  let id = event.params.orderId.toHex()
  let order = store.get("Order", id) as Order

  order.canceller = event.params.sender
  order.tokenRefund = event.params.tokenRefund
  order.sharesRefund = event.params.sharesRefund

  store.set("Order", id, order)
}

export function handleOrderCreated(event: OrderCreated): void {
  let id = event.params.orderId.toHex()
  let order = new Order()

  let orderType = event.params.orderType
  if (orderType == 0){
    order.orderType = "Bid"
  } else {
    order.orderType = "Ask"
  }

  order.amount = event.params.amount
  order.price = event.params.price
  order.creator = event.params.creator
  order.moneyEscrowed = event.params.moneyEscrowed
  order.sharesEscrowed = event.params.sharesEscrowed
  order.tradeGroupIDCreator = event.params.tradeGroupId
  order.universe = event.params.universe
  order.shareToken = event.params.shareToken

  order.filler = new Array<Bytes>()
  order.numCreatorShares = new Array<BigInt>()
  order.numCreatorTokens = new Array<BigInt>()
  order.numFillerShares = new Array<BigInt>()
  order.numFillerTokens = new Array<BigInt>()
  order.marketCreatorFees = new Array<BigInt>()
  order.reporterFees = new Array<BigInt>()
  order.amountFilled = new Array<BigInt>()
  order.tradeGroupIDFilled = new Array<Bytes>()

  store.set("Order", id, order)
}

export function handleOrderFilled(event: OrderFilled): void {
  let id = event.params.orderId.toHex()
  let order = store.get("Order", id) as Order

  let filler = order.filler
  filler.push(event.params.filler)
  order.filler = filler

  let numCreatorShares = order.numCreatorShares
  numCreatorShares.push(event.params.numCreatorShares)
  order.numCreatorShares = numCreatorShares

  let numCreatorTokens = order.numCreatorTokens
  numCreatorTokens.push(event.params.numCreatorTokens)
  order.numCreatorTokens = numCreatorTokens

  let numFillerShares = order.numFillerShares
  numFillerShares.push(event.params.numFillerShares)
  order.numFillerShares = numFillerShares

  let numFillerTokens = order.numFillerTokens
  numFillerTokens.push(event.params.numFillerTokens)
  order.numFillerTokens = numFillerTokens

  let marketCreatorFees = order.marketCreatorFees
  marketCreatorFees.push(event.params.marketCreatorFees)
  order.marketCreatorFees = marketCreatorFees

  let reporterFees = order.reporterFees
  reporterFees.push(event.params.reporterFees)
  order.reporterFees = reporterFees

  let amountFilled = order.amountFilled
  amountFilled.push(event.params.amountFilled)
  order.amountFilled = amountFilled

  let tradeGroupIDFilled = order.tradeGroupIDFilled
  tradeGroupIDFilled.push(event.params.tradeGroupId)
  order.tradeGroupIDFilled = tradeGroupIDFilled

  store.set("Order", id, order)
}