const express = require("express");
const router = express.Router();

// Import all emigrants page routes
const epsKoreaPageRoutes = require("./eps-korea-page");
const labourContractsPageRoutes = require("./labour-contracts-page");
const epsResultsPageRoutes = require("./eps-results-page");
const workerProtectionPageRoutes = require("./worker-protection-page");
const preDepartureTrainingPageRoutes = require("./pre-departure-training-page");
const serviceAgreementsPageRoutes = require("./service-agreements-page");
const industriesPageRoutes = require("./industries-page");
const industryRoutes = require("./industry");

// Mount routes
router.use("/eps-korea-page", epsKoreaPageRoutes);
router.use("/labour-contracts-page", labourContractsPageRoutes);
router.use("/eps-results-page", epsResultsPageRoutes);
router.use("/worker-protection-page", workerProtectionPageRoutes);
router.use("/pre-departure-training-page", preDepartureTrainingPageRoutes);
router.use("/service-agreements-page", serviceAgreementsPageRoutes);
router.use("/industries-page", industriesPageRoutes);
router.use("/industries", industryRoutes);

module.exports = router;
