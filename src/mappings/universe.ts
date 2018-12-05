// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import {store} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  UniverseCreated,
  UniverseForked,
} from '../types/Augur/Augur'

// Import entity types from the schema
import { Universe } from '../types/schema'

export function handleUniverseCreated(event: UniverseCreated): void {
  let id = event.params.childUniverse.toHex()
  let universe = new Universe()

  universe.parentUniverse = event.params.parentUniverse
  universe.payoutNumerators = event.params.payoutNumerators
  universe.invalid = event.params.invalid

  store.set("Universe", id, universe)
}

export function handleUniverseForked(event: UniverseForked): void {
  let id = event.params.universe.toHex()
  let universe = store.get("Universe", id) as Universe

  universe.forked = true

  store.set("Universe", id, universe)

}