// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

//NOTE: does not exist on the current mainnet contract
export function handleDisputeWindowCreated(): void {
}

