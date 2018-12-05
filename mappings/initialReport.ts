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
import { InitialReport } from '../types/schema'

export function handleInitialReportSubmitted(event: InitialReportSubmitted): void {
  let id = event.params.market.toHex()
  let ir = new InitialReport()

  ir.universe = event.params.universe
  ir.reporter = event.params.reporter
  ir.amountStaked = event.params.amountStaked
  ir.isDesignatedReported = event.params.isDesignatedReporter
  ir.payoutNumerators = event.params.payoutNumerators
  ir.invalid = event.params.invalid

  store.set("InitialReport", id, ir)
}

export function handleInitialReporterRedeemed(event: InitialReporterRedeemed): void {
  let id = event.params.market.toHex()
  let ir = store.get("InitialReport", id) as InitialReport

  ir.amountRedeemed = event.params.amountRedeemed
  ir.repReceived = event.params.repReceived
  ir.reportingFeesReceived = event.params.reportingFeesReceived

  store.set("InitialReport", id, ir)
}

//     event InitialReporterTransferred(address indexed universe, address indexed market, address from, address to);
export function handleInitialReporterTransferred(event: InitialReporterTransferred): void {
  let id = event.params.market.toHex()
  let ir = store.get("InitialReport", id) as InitialReport

  ir.reporter = event.params.to

  store.set("InitialReport", id, ir)

}