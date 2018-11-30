// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import { store } from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
// import {} from '../types/'

// Import entity types from the schema
// import { Collateral } from '../types/schema'

// export function handleLock(event: CollateralLocked): void {
//   let id = event.params.agreementID.toHex()
//
//   let collateral = new Collateral()
//   collateral.tokenAddress = event.params.token
//   collateral.amount = event.params.amount
//   collateral.status = 'locked'
//   collateral.debtOrder = id
//
//   store.set('Collateral', id, collateral)
// }