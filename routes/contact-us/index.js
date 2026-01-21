const express = require("express");
const router = express.Router();

const headquartersPageRoutes = require("./headquarters-page");
const travelOfficePageRoutes = require("./travel-office-page");
const regionalOfficeRoutes = require("./regional-office");
const contactFormPageRoutes = require("./contact-form-page");

router.use("/headquarters", headquartersPageRoutes);
router.use("/travel-office", travelOfficePageRoutes);
router.use("/regional-offices", regionalOfficeRoutes);
router.use("/contact-form", contactFormPageRoutes);

module.exports = router;
