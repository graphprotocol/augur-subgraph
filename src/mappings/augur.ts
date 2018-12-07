// We import and export out all the handlers here. This was done to seperate the handlers into files for readability.

// imports
import {
  handleMarketCreated,
  handleMarketFinalized,
  handleReportingParticpiantDisavowed,
  handleMarketMigrated,
  handleMarketMailboxTransferred,
  handleMarketParticipantsDisavowed,
  handleMarketTransferred,
  handleCompleteSetPurchased,
  handleCompleteSetSold,
  handleTradingProceedsClaimed
} from "./market";

import {
  handleInitialReportSubmitted,
  handleInitialReporterRedeemed,
  handleInitialReporterTransferred
} from "./initialReport";

import {
  handleDisputeCrowdsourcerCompleted,
  handleDisputeCrowdsourcerContribution,
  handleDisputeCrowdsourcerCreated,
  handleDisputeCrowdsourcerRedeemed
} from "./disputeCrowdsourcer";

import {
  handleUniverseCreated,
  handleUniverseForked
} from "./universe";

import {
  handleOrderCanceled,
  handleOrderCreated,
  handleOrderFilled
} from "./order";

import {
  handleTokensTransferred,
  handleTokensMinted,
  handleTokensBurned
} from "./token";

// exports
export {
  handleMarketCreated,
  handleMarketFinalized,
  handleReportingParticpiantDisavowed,
  handleMarketMigrated,
  handleMarketMailboxTransferred,
  handleMarketParticipantsDisavowed,
  handleMarketTransferred,
  handleCompleteSetPurchased,
  handleCompleteSetSold,
  handleTradingProceedsClaimed,
  handleInitialReportSubmitted,
  handleInitialReporterRedeemed,
  handleInitialReporterTransferred,
  handleDisputeCrowdsourcerCompleted,
  handleDisputeCrowdsourcerContribution,
  handleDisputeCrowdsourcerCreated,
  handleDisputeCrowdsourcerRedeemed,
  handleUniverseCreated,
  handleUniverseForked,
  handleOrderCanceled,
  handleOrderCreated,
  handleOrderFilled,
  handleTokensTransferred,
  handleTokensMinted,
  handleTokensBurned
}
