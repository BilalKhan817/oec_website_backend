const express = require("express");
const router = express.Router();

const reportsAnalyticsPageRoutes = require("./reports-analytics-page");

router.use("/page", reportsAnalyticsPageRoutes);

module.exports = router;
