const express = require("express");
const router = express.Router();

// Import sub-routes

const boardOfDirectorsRoutes = require("./board-of-directors");
const partnershipRoutes = require("./partnerships");

// Mount them
router.use("/board-of-directors", boardOfDirectorsRoutes);
router.use("/partnerships", partnershipRoutes)

module.exports = router;
