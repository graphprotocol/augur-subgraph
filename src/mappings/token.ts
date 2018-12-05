// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import {store, BigInt, ByteArray} from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import {
  TokensTransferred,
  TokensMinted,
  TokensBurned,
} from '../types/Augur/Augur'

// Import entity types from the schema
import {TokenOwner, Token} from '../types/schema'

// NOTE - these are all commented out for testing, as the tokens here include all transfers of the REP token, so it makes for very slow syncing while testing.

export function handleTokensTransferred(event: TokensTransferred): void {
  // let newOwnerID = concat(event.params.token, event.params.to).toHex()
  // let oldOwnerID = concat(event.params.token, event.params.from).toHex()
  //
  // let newOwner = store.get("TokenOwner", newOwnerID) as TokenOwner | null
  // if (newOwner == null){
  //   newOwner = new TokenOwner()
  //   newOwner.amount = BigInt.fromI32(0)
  //   newOwner.tokenAddress = event.params.token
  // }
  //
  // let oldOwner = store.get("TokenOwner", oldOwnerID) as TokenOwner
  //
  // newOwner.amount = newOwner.amount.plus(event.params.value)
  // oldOwner.amount = oldOwner.amount.minus(event.params.value)
  //
  // store.set("TokenOwner", newOwnerID, newOwner as TokenOwner)
  // store.set("TokenOwner", oldOwnerID, oldOwner as TokenOwner)
}

export function handleTokensMinted(event: TokensMinted): void {
  // let id = event.params.token.toHex()
  // let token = store.get("Token", id) as Token | null
  // if (token == null) {
  //   token = new Token()
  //   token.owners = new Array<string>()
  //
  // }
  //
  // token.universe = event.params.universe
  // token.market = event.params.market
  //
  // let tokenType = event.params.tokenType
  // if (tokenType == 0){
  //   token.tokenType = "ReputationToken"
  // } else if (tokenType = 1){
  //   token.tokenType = "ShareToken"
  // } else if (tokenType = 2) {
  //   token.tokenType = "DisputeCrowdsourcer"
  // } else if (tokenType = 3){
  //   token.tokenType = "FeeWindow"
  // } else {
  //   token.tokenType = "FeeToken"
  // }
  //
  // store.set("Token", id, token as Token)
  //
  // let ownerID = concat(event.params.token, event.params.target).toHex()
  // let owner = store.get("TokenOwner", ownerID) as TokenOwner | null
  // if (owner == null){
  //   owner = new TokenOwner()
  //   owner.amount = BigInt.fromI32(0)
  //   owner.tokenAddress = event.params.token
  // }
  // owner.amount = owner.amount.plus(event.params.amount)
  //
  // store.set("TokenOwner", ownerID, owner as TokenOwner)
}

export function handleTokensBurned(event: TokensBurned): void {
  // let ownerID = concat(event.params.token, event.params.target).toHex()
  // let owner = store.get("TokenOwner", ownerID) as TokenOwner
  //
  // owner.amount = owner.amount.minus(event.params.amount)
  //
  // store.set("TokenOwner", ownerID, owner)
}


function concat(a: ByteArray, b: ByteArray): ByteArray {
  let out = new Uint8Array(a.length + b.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = a[i];
  }
  for (let j = 0; j < b.length; j++) {
    out[a.length + j] = b[j];
  }
  return out as ByteArray;
}
