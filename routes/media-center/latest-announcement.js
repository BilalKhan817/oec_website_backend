const express = require("express");
const router = express.Router();
const LatestAnnouncement = require("../../models/media-center/latest-announcement");
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

// GET all announcements with filters
router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured, announcementType } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.is_active = isActive === "true";
    }
    if (isFeatured !== undefined) {
      query.is_featured = isFeatured === "true";
    }
    if (announcementType) {
      query.announcement_type = announcementType;
    }

    const announcements = await LatestAnnouncement.find(query).sort({
      priority: -1,
      order: 1,
      published_date: -1,
    });

    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single announcement by ID
router.get("/:id", async (req, res) => {
  try {
    const announcement = await LatestAnnouncement.findById(req.params.id);
    if (!announcement) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }
    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new announcement
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "attachments", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.attachments) data.attachments = parseJSON(data.attachments);
      if (data.images) data.images = parseJSON(data.images);
      if (data.tags) data.tags = parseJSON(data.tags);

      if (req.files) {
        if (req.files.images) {
          data.images = req.files.images.map((file) => file.path);
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

      const announcement = new LatestAnnouncement(data);
      await announcement.save();

      res.status(201).json({ success: true, data: announcement });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update announcement by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.attachments) data.attachments = parseJSON(data.attachments);
    if (data.images) data.images = parseJSON(data.images);
    if (data.tags) data.tags = parseJSON(data.tags);

    if (req.files && req.files.length > 0) {
      const imageFiles = req.files.filter((f) => f.fieldname === "images");
      const attachmentFiles = req.files.filter(
        (f) => f.fieldname === "attachments"
      );

      if (imageFiles.length > 0) {
        data.images = imageFiles.map((file) => file.path);
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

    const announcement = await LatestAnnouncement.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }

    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE announcement by ID
router.delete("/:id", async (req, res) => {
  try {
    const announcement = await LatestAnnouncement.findByIdAndDelete(
      req.params.id
    );

    if (!announcement) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found" });
    }

    res.json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
