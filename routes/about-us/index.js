const express = require("express");
const router = express.Router();

// Import sub-routes
const boardOfDirectorsRoutes = require("./board-of-directors");
const partnershipRoutes = require("./partnerships");

// Import page content routes
const aboutOecPageRoutes = require("./about-oec-page");
const governingLawPageRoutes = require("./governing-law-page");
const oecAtGlancePageRoutes = require("./oec-at-glance-page");
const ourFunctionsPageRoutes = require("./our-functions-page");
const ourExecutivesPageRoutes = require("./our-executives-page");
const mdMessagePageRoutes = require("./md-message-page");
const missionVisionPageRoutes = require("./mission-vision-page");
const achievementsPageRoutes = require("./achievements-page");
const whyChooseOecPageRoutes = require("./why-choose-oec-page");

// Import models for navbar descriptions
const AboutOecPage = require("../../models/about-us/about-oec-page");
const GoverningLawPage = require("../../models/about-us/governing-law-page");
const OecAtGlancePage = require("../../models/about-us/oec-at-glance-page");
const OurFunctionsPage = require("../../models/about-us/our-functions-page");
const OurExecutivesPage = require("../../models/about-us/our-executives-page");
const MdMessagePage = require("../../models/about-us/md-message-page");
const MissionVisionPage = require("../../models/about-us/mission-vision-page");
const AchievementsPage = require("../../models/about-us/achievements-page");
const WhyChooseOecPage = require("../../models/about-us/why-choose-oec-page");

// API endpoint to get all navbar descriptions
router.get("/navbar-descriptions", async (req, res) => {
  try {
    const [
      aboutOec,
      governingLaw,
      oecAtGlance,
      ourFunctions,
      ourExecutives,
      mdMessage,
      missionVision,
      achievements,
      whyChooseOec
    ] = await Promise.all([
      AboutOecPage.findOne().select('navbar_description'),
      GoverningLawPage.findOne().select('navbar_description'),
      OecAtGlancePage.findOne().select('navbar_description'),
      OurFunctionsPage.findOne().select('navbar_description'),
      OurExecutivesPage.findOne().select('navbar_description'),
      MdMessagePage.findOne().select('navbar_description'),
      MissionVisionPage.findOne().select('navbar_description'),
      AchievementsPage.findOne().select('navbar_description'),
      WhyChooseOecPage.findOne().select('navbar_description')
    ]);

    res.json({
      success: true,
      data: {
        aboutOec: aboutOec?.navbar_description || "Leading organization for overseas employment.",
        governingLaw: governingLaw?.navbar_description || "Legal framework and regulations governing overseas employment.",
        oecAtGlance: oecAtGlance?.navbar_description || "Quick facts and statistics about OEC",
        ourFunctions: ourFunctions?.navbar_description || "Core functions and services provided by OEC.",
        ourExecutives: ourExecutives?.navbar_description || "Senior management and leadership team",
        mdMessage: mdMessage?.navbar_description || "Message from the Managing Director",
        missionVision: missionVision?.navbar_description || "Our mission, vision and core values",
        achievements: achievements?.navbar_description || "Milestones and accomplishments",
        whyChooseOec: whyChooseOec?.navbar_description || "Reasons to choose OEC for overseas employment"
      }
    });
  } catch (error) {
    console.error("Error fetching navbar descriptions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching navbar descriptions",
      error: error.message
    });
  }
});

// Mount them
router.use("/board-of-directors", boardOfDirectorsRoutes);
router.use("/partnerships", partnershipRoutes);

// Mount page content routes
router.use("/about-oec-page", aboutOecPageRoutes);
router.use("/governing-law-page", governingLawPageRoutes);
router.use("/oec-at-glance-page", oecAtGlancePageRoutes);
router.use("/our-functions-page", ourFunctionsPageRoutes);
router.use("/our-executives-page", ourExecutivesPageRoutes);
router.use("/md-message-page", mdMessagePageRoutes);
router.use("/mission-vision-page", missionVisionPageRoutes);
router.use("/achievements-page", achievementsPageRoutes);
router.use("/why-choose-oec-page", whyChooseOecPageRoutes);

module.exports = router;
