const express = require("express");
const router = express.Router();
const MediaGallery = require("../../models/media-center/media-gallery");
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

// GET all media galleries with filters
router.get("/", async (req, res) => {
  try {
    const { isActive, isFeatured, galleryType } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.is_active = isActive === "true";
    }
    if (isFeatured !== undefined) {
      query.is_featured = isFeatured === "true";
    }
    if (galleryType) {
      query.gallery_type = galleryType;
    }

    const mediaGalleries = await MediaGallery.find(query).sort({
      order: 1,
      event_date: -1,
    });

    res.json({ success: true, data: mediaGalleries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single media gallery by ID
router.get("/:id", async (req, res) => {
  try {
    const mediaGallery = await MediaGallery.findById(req.params.id);
    if (!mediaGallery) {
      return res
        .status(404)
        .json({ success: false, message: "Media gallery not found" });
    }
    res.json({ success: true, data: mediaGallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new media gallery
router.post(
  "/",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "photos", maxCount: 50 },
    { name: "video_thumbnails", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (data.photos) data.photos = parseJSON(data.photos);
      if (data.videos) data.videos = parseJSON(data.videos);
      if (data.tags) data.tags = parseJSON(data.tags);

      if (req.files) {
        if (req.files.cover_image) {
          data.cover_image = req.files.cover_image[0].path;
        }
        if (req.files.photos && data.photos) {
          data.photos = data.photos.map((photo, index) => ({
            ...photo,
            image_url: req.files.photos[index]
              ? req.files.photos[index].path
              : photo.image_url,
          }));
        }
        if (req.files.video_thumbnails && data.videos) {
          data.videos = data.videos.map((video, index) => ({
            ...video,
            thumbnail: req.files.video_thumbnails[index]
              ? req.files.video_thumbnails[index].path
              : video.thumbnail,
          }));
        }
      }

      const mediaGallery = new MediaGallery(data);
      await mediaGallery.save();

      res.status(201).json({ success: true, data: mediaGallery });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT update media gallery by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.photos) data.photos = parseJSON(data.photos);
    if (data.videos) data.videos = parseJSON(data.videos);
    if (data.tags) data.tags = parseJSON(data.tags);

    if (req.files && req.files.length > 0) {
      const coverImageFile = req.files.find(
        (f) => f.fieldname === "cover_image"
      );
      const photoFiles = req.files.filter((f) => f.fieldname === "photos");
      const videoThumbnailFiles = req.files.filter(
        (f) => f.fieldname === "video_thumbnails"
      );

      if (coverImageFile) {
        data.cover_image = coverImageFile.path;
      }
      if (photoFiles.length > 0 && data.photos) {
        data.photos = data.photos.map((photo, index) => ({
          ...photo,
          image_url: photoFiles[index]
            ? photoFiles[index].path
            : photo.image_url,
        }));
      }
      if (videoThumbnailFiles.length > 0 && data.videos) {
        data.videos = data.videos.map((video, index) => ({
          ...video,
          thumbnail: videoThumbnailFiles[index]
            ? videoThumbnailFiles[index].path
            : video.thumbnail,
        }));
      }
    }

    const mediaGallery = await MediaGallery.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!mediaGallery) {
      return res
        .status(404)
        .json({ success: false, message: "Media gallery not found" });
    }

    res.json({ success: true, data: mediaGallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE media gallery by ID
router.delete("/:id", async (req, res) => {
  try {
    const mediaGallery = await MediaGallery.findByIdAndDelete(req.params.id);

    if (!mediaGallery) {
      return res
        .status(404)
        .json({ success: false, message: "Media gallery not found" });
    }

    res.json({
      success: true,
      message: "Media gallery deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
