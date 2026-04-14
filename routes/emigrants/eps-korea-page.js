const express = require("express");
const router = express.Router();
const EpsKoreaPage = require("../../models/emigrants/eps-korea-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/emigrants/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await EpsKoreaPage.findOne({});

    if (!page) {
      // Try direct collection query
      const directResult = await EpsKoreaPage.collection.findOne({});
      if (directResult) {
        return res.json({ success: true, data: directResult });
      }
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.single('image'), async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.title !== undefined) updateFields.title = req.body.title;
    if (req.body.description !== undefined) updateFields.description = req.body.description;
    if (req.file) {
      updateFields.image = `/uploads/emigrants/${req.file.filename}`;
    }

    // Use the raw collection to avoid Mongoose findOne issues
    const existing = await EpsKoreaPage.collection.findOne({});
    if (existing) {
      await EpsKoreaPage.collection.updateOne({ _id: existing._id }, { $set: updateFields });
      const updated = await EpsKoreaPage.collection.findOne({ _id: existing._id });
      res.status(200).json({ success: true, data: updated });
    } else {
      if (!updateFields.image) updateFields.image = '';
      const result = await EpsKoreaPage.collection.insertOne({
        ...updateFields,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      const created = await EpsKoreaPage.collection.findOne({ _id: result.insertedId });
      res.status(200).json({ success: true, data: created });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title || '',
      description: req.body.description || ''
    };

    if (req.file) {
      updateData.image = `/uploads/emigrants/${req.file.filename}`;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    const page = await EpsKoreaPage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
