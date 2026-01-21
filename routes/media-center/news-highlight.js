const express = require("express");
const router = express.Router();
const NewsHighlight = require("../../models/media-center/news-highlight");
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

// GET all news highlights with filters
router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured, category } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.is_active = isActive === "true";
    }
    if (isFeatured !== undefined) {
      query.is_featured = isFeatured === "true";
    }
    if (category) {
      query.category = category;
    }

    const newsHighlights = await NewsHighlight.find(query).sort({
      order: 1,
      published_date: -1,
    });

    res.json({ success: true, data: newsHighlights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single news highlight by ID
router.get("/:id", async (req, res) => {
  try {
    const newsHighlight = await NewsHighlight.findById(req.params.id);
    if (!newsHighlight) {
      return res
        .status(404)
        .json({ success: false, message: "News highlight not found" });
    }
    res.json({ success: true, data: newsHighlight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new news highlight
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "featured_image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.source) data.source = parseJSON(data.source);
      if (data.images) data.images = parseJSON(data.images);
      if (data.tags) data.tags = parseJSON(data.tags);

      if (req.files) {
        if (req.files.images) {
          data.images = req.files.images.map((file) => file.path);
        }
        if (req.files.featured_image) {
          data.featured_image = req.files.featured_image[0].path;
        }
      }

      const newsHighlight = new NewsHighlight(data);
      await newsHighlight.save();

      res.status(201).json({ success: true, data: newsHighlight });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update news highlight by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.source) data.source = parseJSON(data.source);
    if (data.images) data.images = parseJSON(data.images);
    if (data.tags) data.tags = parseJSON(data.tags);

    if (req.files && req.files.length > 0) {
      const imageFiles = req.files.filter((f) => f.fieldname === "images");
      const featuredImageFile = req.files.find(
        (f) => f.fieldname === "featured_image"
      );

      if (imageFiles.length > 0) {
        data.images = imageFiles.map((file) => file.path);
      }
      if (featuredImageFile) {
        data.featured_image = featuredImageFile.path;
      }
    }

    const newsHighlight = await NewsHighlight.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!newsHighlight) {
      return res
        .status(404)
        .json({ success: false, message: "News highlight not found" });
    }

    res.json({ success: true, data: newsHighlight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE news highlight by ID
router.delete("/:id", async (req, res) => {
  try {
    const newsHighlight = await NewsHighlight.findByIdAndDelete(req.params.id);

    if (!newsHighlight) {
      return res
        .status(404)
        .json({ success: false, message: "News highlight not found" });
    }

    res.json({
      success: true,
      message: "News highlight deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
