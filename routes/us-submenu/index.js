const express = require("express");
const router = express.Router();

const emigrantsRoutes = require("./emigrants");
const developmentHubRoutes = require("./development-hub");
const mediaCenterRoutes = require("./media-center");
const reportsAnalyticsRoutes = require("./reports-analytics");

router.use("/emigrants", emigrantsRoutes);
router.use("/development-hub", developmentHubRoutes);
router.use("/media-center", mediaCenterRoutes);
router.use("/reports-analytics", reportsAnalyticsRoutes);

module.exports = router;
