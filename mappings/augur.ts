// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }


import {handleMarketCreated, handleMarketFinalized, handleReportingParticpiantDisavowed, handleMarketMigrated, handleMarketMailboxTransferred} from "./market";

export {handleMarketCreated, handleMarketFinalized, handleReportingParticpiantDisavowed, handleMarketMigrated, handleMarketMailboxTransferred}
