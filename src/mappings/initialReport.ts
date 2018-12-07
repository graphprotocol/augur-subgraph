// Import APIs from graph-ts
import {Bytes} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  InitialReporterTransferred,
  InitialReporterRedeemed,
  InitialReportSubmitted
} from '../types/Augur/Augur'

// Import entity types from the schema
import {InitialReport, User} from '../types/schema'

export function handleInitialReportSubmitted(event: InitialReportSubmitted): void {
  let id = event.params.market.toHex()
  let ir = new InitialReport(id)

  ir.universe = event.params.universe
  ir.reporter = event.params.reporter
  ir.amountStaked = event.params.amountStaked
  ir.isDesignatedReporter = event.params.isDesignatedReporter
  ir.payoutNumerators = event.params.payoutNumerators
  ir.invalid = event.params.invalid

  ir.save()

  // User data below
  let userID = event.params.reporter.toHex()
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
    user.save()
  }

}

export function handleInitialReporterRedeemed(event: InitialReporterRedeemed): void {
  let id = event.params.market.toHex()
  let ir = InitialReport.load(id)

  ir.amountRedeemed = event.params.amountRedeemed
  ir.repReceived = event.params.repReceived
  ir.reportingFeesReceived = event.params.reportingFeesReceived

  ir.save()
}

export function handleInitialReporterTransferred(event: InitialReporterTransferred): void {
  let id = event.params.market.toHex()
  let ir = InitialReport.load(id)

  ir.reporter = event.params.to

  ir.save()

  // User data below
  let userID = event.params.to.toHex()
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
    user.save()
  }


}