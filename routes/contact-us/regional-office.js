const express = require("express");
const router = express.Router();
const RegionalOffice = require("../../models/contact-us/regional-office");
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

// GET all regional offices with filters
router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured, region } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.is_active = isActive === "true";
    }
    if (isFeatured !== undefined) {
      query.is_featured = isFeatured === "true";
    }
    if (region) {
      query.region = region;
    }

    const regionalOffices = await RegionalOffice.find(query).sort({
      order: 1,
      city: 1,
    });

    res.json({ success: true, data: regionalOffices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single regional office by ID
router.get("/:id", async (req, res) => {
  try {
    const regionalOffice = await RegionalOffice.findById(req.params.id);
    if (!regionalOffice) {
      return res
        .status(404)
        .json({ success: false, message: "Regional office not found" });
    }
    res.json({ success: true, data: regionalOffice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new regional office
router.post(
  "/",
  upload.fields([
    { name: "office_images", maxCount: 10 },
    { name: "head_photo", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.phone_numbers) data.phone_numbers = parseJSON(data.phone_numbers);
      if (data.fax_numbers) data.fax_numbers = parseJSON(data.fax_numbers);
      if (data.email_addresses)
        data.email_addresses = parseJSON(data.email_addresses);
      if (data.working_hours) data.working_hours = parseJSON(data.working_hours);
      if (data.office_head) data.office_head = parseJSON(data.office_head);
      if (data.services_offered)
        data.services_offered = parseJSON(data.services_offered);
      if (data.map_location) data.map_location = parseJSON(data.map_location);
      if (data.office_images) data.office_images = parseJSON(data.office_images);

      if (req.files) {
        if (req.files.office_images) {
          data.office_images = req.files.office_images.map((file) => file.path);
        }
        if (req.files.head_photo) {
          if (!data.office_head) data.office_head = {};
          data.office_head.photo = req.files.head_photo[0].path;
        }
      }

      const regionalOffice = new RegionalOffice(data);
      await regionalOffice.save();

      res.status(201).json({ success: true, data: regionalOffice });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update regional office by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.phone_numbers) data.phone_numbers = parseJSON(data.phone_numbers);
    if (data.fax_numbers) data.fax_numbers = parseJSON(data.fax_numbers);
    if (data.email_addresses)
      data.email_addresses = parseJSON(data.email_addresses);
    if (data.working_hours) data.working_hours = parseJSON(data.working_hours);
    if (data.office_head) data.office_head = parseJSON(data.office_head);
    if (data.services_offered)
      data.services_offered = parseJSON(data.services_offered);
    if (data.map_location) data.map_location = parseJSON(data.map_location);
    if (data.office_images) data.office_images = parseJSON(data.office_images);

    if (req.files && req.files.length > 0) {
      const imageFiles = req.files.filter(
        (f) => f.fieldname === "office_images"
      );
      const headPhotoFile = req.files.find((f) => f.fieldname === "head_photo");

      if (imageFiles.length > 0) {
        data.office_images = imageFiles.map((file) => file.path);
      }
      if (headPhotoFile) {
        if (!data.office_head) data.office_head = {};
        data.office_head.photo = headPhotoFile.path;
      }
    }

    const regionalOffice = await RegionalOffice.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!regionalOffice) {
      return res
        .status(404)
        .json({ success: false, message: "Regional office not found" });
    }

    res.json({ success: true, data: regionalOffice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE regional office by ID
router.delete("/:id", async (req, res) => {
  try {
    const regionalOffice = await RegionalOffice.findByIdAndDelete(
      req.params.id
    );

    if (!regionalOffice) {
      return res
        .status(404)
        .json({ success: false, message: "Regional office not found" });
    }

    res.json({
      success: true,
      message: "Regional office deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
