// Import APIs from graph-ts
import {Bytes, BigInt} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  DisputeCrowdsourcerCompleted,
  DisputeCrowdsourcerContribution,
  DisputeCrowdsourcerCreated,
  DisputeCrowdsourcerRedeemed
}
  from '../types/Augur/Augur'

// Import entity types from the schema
import {DisputeCrowdsourcer, InitialReport, User} from '../types/schema'


export function handleDisputeCrowdsourcerCompleted(event: DisputeCrowdsourcerCompleted): void {
  let id = event.params.market.toHex()
  let dc = DisputeCrowdsourcer.load(id)

  dc.completed = true

  dc.save()
}

export function handleDisputeCrowdsourcerContribution(event: DisputeCrowdsourcerContribution): void {
  let id = event.params.market.toHex()
  let dc = DisputeCrowdsourcer.load(id)

  let reporters = dc.reporters
  reporters.push(event.params.reporter)
  dc.reporters = reporters

  let amountStaked = dc.amountStaked
  amountStaked.push(event.params.amountStaked)
  dc.amountStaked = amountStaked


  dc.save()

  // User data below
  let userID = event.params.reporter.toHex()
  let user = User.load(userID)
  if (user == null) {
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

  let userDC = user.disputeCrowdsourcers
  userDC.push(event.params.market)
  user.disputeCrowdsourcers = userDC

  user.save()
}

export function handleDisputeCrowdsourcerCreated(event: DisputeCrowdsourcerCreated): void {
  let id = event.params.market.toHex()
  let dc = new DisputeCrowdsourcer(id)

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

  dc.save()
}


export function handleDisputeCrowdsourcerRedeemed(event: DisputeCrowdsourcerRedeemed): void {
  let id = event.params.market.toHex()
  let dc = DisputeCrowdsourcer.load(id)

  let amountRedeemed = dc.amountRedeemed
  amountRedeemed.push(event.params.amountRedeemed)
  dc.amountRedeemed = amountRedeemed

  let repReceived = dc.repReceived
  repReceived.push(event.params.repReceived)
  dc.repReceived = repReceived

  let reportingFeesReceived = dc.reportingFeesReceived
  reportingFeesReceived.push(event.params.reportingFeesReceived)
  dc.reportingFeesReceived = reportingFeesReceived

  dc.save()
}