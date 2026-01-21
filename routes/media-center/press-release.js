const express = require("express");
const router = express.Router();
const PressRelease = require("../../models/media-center/press-release");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/media-center/");
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

// GET all press releases with filters
router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.is_active = isActive === "true";
    }
    if (isFeatured !== undefined) {
      query.is_featured = isFeatured === "true";
    }

    const pressReleases = await PressRelease.find(query).sort({
      order: 1,
      release_date: -1,
    });

    res.json({ success: true, data: pressReleases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single press release by ID
router.get("/:id", async (req, res) => {
  try {
    const pressRelease = await PressRelease.findById(req.params.id);
    if (!pressRelease) {
      return res
        .status(404)
        .json({ success: false, message: "Press release not found" });
    }
    res.json({ success: true, data: pressRelease });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new press release
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "featured_image", maxCount: 1 },
    { name: "attachments", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.contact_person)
        data.contact_person = parseJSON(data.contact_person);
      if (data.attachments) data.attachments = parseJSON(data.attachments);
      if (data.images) data.images = parseJSON(data.images);
      if (data.tags) data.tags = parseJSON(data.tags);

      if (req.files) {
        if (req.files.images) {
          data.images = req.files.images.map((file) => file.path);
        }
        if (req.files.featured_image) {
          data.featured_image = req.files.featured_image[0].path;
        }
        if (req.files.attachments) {
          const attachments = req.files.attachments.map((file) => ({
            file_name: file.originalname,
            file_url: file.path,
            file_type: file.mimetype,
          }));
          data.attachments = attachments;
        }
      }

      const pressRelease = new PressRelease(data);
      await pressRelease.save();

      res.status(201).json({ success: true, data: pressRelease });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update press release by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.contact_person)
      data.contact_person = parseJSON(data.contact_person);
    if (data.attachments) data.attachments = parseJSON(data.attachments);
    if (data.images) data.images = parseJSON(data.images);
    if (data.tags) data.tags = parseJSON(data.tags);

    if (req.files && req.files.length > 0) {
      const imageFiles = req.files.filter((f) => f.fieldname === "images");
      const featuredImageFile = req.files.find(
        (f) => f.fieldname === "featured_image"
      );
      const attachmentFiles = req.files.filter(
        (f) => f.fieldname === "attachments"
      );

      if (imageFiles.length > 0) {
        data.images = imageFiles.map((file) => file.path);
      }
      if (featuredImageFile) {
        data.featured_image = featuredImageFile.path;
      }
      if (attachmentFiles.length > 0) {
        const attachments = attachmentFiles.map((file) => ({
          file_name: file.originalname,
          file_url: file.path,
          file_type: file.mimetype,
        }));
        data.attachments = attachments;
      }
    }

    const pressRelease = await PressRelease.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!pressRelease) {
      return res
        .status(404)
        .json({ success: false, message: "Press release not found" });
    }

    res.json({ success: true, data: pressRelease });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE press release by ID
router.delete("/:id", async (req, res) => {
  try {
    const pressRelease = await PressRelease.findByIdAndDelete(req.params.id);

    if (!pressRelease) {
      return res
        .status(404)
        .json({ success: false, message: "Press release not found" });
    }

    res.json({
      success: true,
      message: "Press release deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
