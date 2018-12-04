// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// imports
import {handleMarketCreated, handleMarketFinalized, handleReportingParticpiantDisavowed, handleMarketMigrated, handleMarketMailboxTransferred} from "./market";

// exports
export {handleMarketCreated, handleMarketFinalized, handleReportingParticpiantDisavowed, handleMarketMigrated, handleMarketMailboxTransferred}
