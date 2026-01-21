const express = require("express");
const router = express.Router();

const latestAnnouncementRoutes = require("./latest-announcement");
const pressReleaseRoutes = require("./press-release");
const newsHighlightRoutes = require("./news-highlight");
const eventRoutes = require("./event");
const mediaResourceRoutes = require("./media-resource");
const mediaGalleryRoutes = require("./media-gallery");

router.use("/latest-announcements", latestAnnouncementRoutes);
router.use("/press-releases", pressReleaseRoutes);
router.use("/news-highlights", newsHighlightRoutes);
router.use("/events", eventRoutes);
router.use("/media-resources", mediaResourceRoutes);
router.use("/media-galleries", mediaGalleryRoutes);

module.exports = router;
