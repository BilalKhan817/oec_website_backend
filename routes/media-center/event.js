const express = require("express");
const router = express.Router();
const Event = require("../../models/media-center/event");
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

// GET all events with filters
router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured, eventType, status } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.is_active = isActive === "true";
    }
    if (isFeatured !== undefined) {
      query.is_featured = isFeatured === "true";
    }
    if (eventType) {
      query.event_type = eventType;
    }
    if (status) {
      query.status = status;
    }

    const events = await Event.find(query).sort({
      order: 1,
      event_date: -1,
    });

    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new event
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "featured_image", maxCount: 1 },
    { name: "attachments", maxCount: 10 },
    { name: "speaker_photos", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.speakers) data.speakers = parseJSON(data.speakers);
      if (data.attachments) data.attachments = parseJSON(data.attachments);
      if (data.images) data.images = parseJSON(data.images);

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
        if (req.files.speaker_photos && data.speakers) {
          data.speakers = data.speakers.map((speaker, index) => ({
            ...speaker,
            photo: req.files.speaker_photos[index]
              ? req.files.speaker_photos[index].path
              : speaker.photo,
          }));
        }
      }

      const event = new Event(data);
      await event.save();

      res.status(201).json({ success: true, data: event });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update event by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.speakers) data.speakers = parseJSON(data.speakers);
    if (data.attachments) data.attachments = parseJSON(data.attachments);
    if (data.images) data.images = parseJSON(data.images);

    if (req.files && req.files.length > 0) {
      const imageFiles = req.files.filter((f) => f.fieldname === "images");
      const featuredImageFile = req.files.find(
        (f) => f.fieldname === "featured_image"
      );
      const attachmentFiles = req.files.filter(
        (f) => f.fieldname === "attachments"
      );
      const speakerPhotoFiles = req.files.filter(
        (f) => f.fieldname === "speaker_photos"
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
      if (speakerPhotoFiles.length > 0 && data.speakers) {
        data.speakers = data.speakers.map((speaker, index) => ({
          ...speaker,
          photo: speakerPhotoFiles[index]
            ? speakerPhotoFiles[index].path
            : speaker.photo,
        }));
      }
    }

    const event = await Event.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE event by ID
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
