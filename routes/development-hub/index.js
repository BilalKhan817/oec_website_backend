const express = require("express");
const router = express.Router();

const successStoryRoutes = require("./success-story");
const projectRoutes = require("./project");
const futurePlansPageRoutes = require("./future-plans-page");
const mouRoutes = require("./mou");

router.use("/success-stories", successStoryRoutes);
router.use("/projects", projectRoutes);
router.use("/pages/future-plans", futurePlansPageRoutes);
router.use("/mous", mouRoutes);

module.exports = router;
