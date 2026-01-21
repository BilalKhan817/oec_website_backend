const express = require("express");
const router = express.Router();
const MediaResource = require("../../models/media-center/media-resource");
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

// GET all media resources with filters
router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured, resourceType, category } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.is_active = isActive === "true";
    }
    if (isFeatured !== undefined) {
      query.is_featured = isFeatured === "true";
    }
    if (resourceType) {
      query.resource_type = resourceType;
    }
    if (category) {
      query.category = category;
    }

    const mediaResources = await MediaResource.find(query).sort({
      order: 1,
      published_date: -1,
    });

    res.json({ success: true, data: mediaResources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single media resource by ID
router.get("/:id", async (req, res) => {
  try {
    const mediaResource = await MediaResource.findById(req.params.id);
    if (!mediaResource) {
      return res
        .status(404)
        .json({ success: false, message: "Media resource not found" });
    }
    res.json({ success: true, data: mediaResource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new media resource
router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.tags) data.tags = parseJSON(data.tags);

      if (req.files) {
        if (req.files.file) {
          data.file_url = req.files.file[0].path;
          data.file_size = (req.files.file[0].size / 1024).toFixed(2) + " KB";
          data.file_format = path.extname(req.files.file[0].originalname);
        }
        if (req.files.thumbnail) {
          data.thumbnail = req.files.thumbnail[0].path;
        }
      }

      const mediaResource = new MediaResource(data);
      await mediaResource.save();

      res.status(201).json({ success: true, data: mediaResource });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update media resource by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.tags) data.tags = parseJSON(data.tags);

    if (req.files && req.files.length > 0) {
      const fileUpload = req.files.find((f) => f.fieldname === "file");
      const thumbnailFile = req.files.find((f) => f.fieldname === "thumbnail");

      if (fileUpload) {
        data.file_url = fileUpload.path;
        data.file_size = (fileUpload.size / 1024).toFixed(2) + " KB";
        data.file_format = path.extname(fileUpload.originalname);
      }
      if (thumbnailFile) {
        data.thumbnail = thumbnailFile.path;
      }
    }

    const mediaResource = await MediaResource.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!mediaResource) {
      return res
        .status(404)
        .json({ success: false, message: "Media resource not found" });
    }

    res.json({ success: true, data: mediaResource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE media resource by ID
router.delete("/:id", async (req, res) => {
  try {
    const mediaResource = await MediaResource.findByIdAndDelete(req.params.id);

    if (!mediaResource) {
      return res
        .status(404)
        .json({ success: false, message: "Media resource not found" });
    }

    res.json({
      success: true,
      message: "Media resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
