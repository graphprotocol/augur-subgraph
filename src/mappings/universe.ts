// Import event types from the registrar contract ABI
import {
  UniverseCreated,
  UniverseForked,
} from '../types/Augur/Augur'

// Import entity types from the schema
import { Universe } from '../types/schema'

export function handleUniverseCreated(event: UniverseCreated): void {
  let id = event.params.childUniverse.toHex()
  let universe = new Universe(id)

  universe.parentUniverse = event.params.parentUniverse
  universe.payoutNumerators = event.params.payoutNumerators
  universe.invalid = event.params.invalid

  universe.save()
}

export function handleUniverseForked(event: UniverseForked): void {
  let id = event.params.universe.toHex()
  let universe = Universe.load(id)

  universe.forked = true

  universe.save()
}