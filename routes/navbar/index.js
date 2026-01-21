const express = require("express");
const router = express.Router();

const menuRoutes = require("./menu");
const submenuRoutes = require("./submenu");

router.use("/menus", menuRoutes);
router.use("/submenus", submenuRoutes);

module.exports = router;
