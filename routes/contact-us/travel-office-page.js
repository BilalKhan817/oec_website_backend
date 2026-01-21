const express = require("express");
const router = express.Router();
const TravelOfficePage = require("../../models/contact-us/travel-office-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/contact-us/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const parseJSON = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch (e) {
    return data;
  }
};

// GET travel office page
router.get("/", async (req, res) => {
  try {
    const page = await TravelOfficePage.findOne({ is_active: true });
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create or update travel office page
router.post(
  "/",
  upload.fields([{ name: "office_images", maxCount: 10 }]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.phone_numbers) data.phone_numbers = parseJSON(data.phone_numbers);
      if (data.fax_numbers) data.fax_numbers = parseJSON(data.fax_numbers);
      if (data.email_addresses)
        data.email_addresses = parseJSON(data.email_addresses);
      if (data.working_hours) data.working_hours = parseJSON(data.working_hours);
      if (data.services_offered)
        data.services_offered = parseJSON(data.services_offered);
      if (data.map_location) data.map_location = parseJSON(data.map_location);
      if (data.office_images) data.office_images = parseJSON(data.office_images);

      if (req.files && req.files.office_images) {
        data.office_images = req.files.office_images.map((file) => file.path);
      }

      let page = await TravelOfficePage.findOne();
      if (page) {
        page = await TravelOfficePage.findByIdAndUpdate(page._id, data, {
          new: true,
          runValidators: true,
        });
      } else {
        page = new TravelOfficePage(data);
        await page.save();
      }

      res.status(200).json({ success: true, data: page });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update travel office page by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.phone_numbers) data.phone_numbers = parseJSON(data.phone_numbers);
    if (data.fax_numbers) data.fax_numbers = parseJSON(data.fax_numbers);
    if (data.email_addresses)
      data.email_addresses = parseJSON(data.email_addresses);
    if (data.working_hours) data.working_hours = parseJSON(data.working_hours);
    if (data.services_offered)
      data.services_offered = parseJSON(data.services_offered);
    if (data.map_location) data.map_location = parseJSON(data.map_location);
    if (data.office_images) data.office_images = parseJSON(data.office_images);

    if (req.files && req.files.length > 0) {
      const imageFiles = req.files.filter(
        (f) => f.fieldname === "office_images"
      );
      if (imageFiles.length > 0) {
        data.office_images = imageFiles.map((file) => file.path);
      }
    }

    const page = await TravelOfficePage.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
