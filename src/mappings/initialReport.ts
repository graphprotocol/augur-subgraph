// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import {store, Bytes} from '@graphprotocol/graph-ts'

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
  let ir = new InitialReport()

  ir.universe = event.params.universe
  ir.reporter = event.params.reporter
  ir.amountStaked = event.params.amountStaked
  ir.isDesignatedReporter = event.params.isDesignatedReporter
  ir.payoutNumerators = event.params.payoutNumerators
  ir.invalid = event.params.invalid

  store.set("InitialReport", id, ir)

  // User data below
  let userID = event.params.reporter.toHex()
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
    store.set("User", userID, user as User)
  }

}

export function handleInitialReporterRedeemed(event: InitialReporterRedeemed): void {
  let id = event.params.market.toHex()
  let ir = store.get("InitialReport", id) as InitialReport

  ir.amountRedeemed = event.params.amountRedeemed
  ir.repReceived = event.params.repReceived
  ir.reportingFeesReceived = event.params.reportingFeesReceived

  store.set("InitialReport", id, ir)
}

export function handleInitialReporterTransferred(event: InitialReporterTransferred): void {
  let id = event.params.market.toHex()
  let ir = store.get("InitialReport", id) as InitialReport

  ir.reporter = event.params.to

  store.set("InitialReport", id, ir)

  // User data below
  let userID = event.params.to.toHex()
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
    store.set("User", userID, user as User)
  }


}