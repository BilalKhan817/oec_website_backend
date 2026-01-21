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
    console.log('[EPS KOREA] Route hit - searching database...');
    console.log('[EPS KOREA] Model name:', EpsKoreaPage.modelName);
    console.log('[EPS KOREA] Collection name:', EpsKoreaPage.collection.name);
    console.log('[EPS KOREA] DB name:', EpsKoreaPage.db.name);
    console.log('[EPS KOREA] Connection string:', EpsKoreaPage.db.client.s.url);

    const page = await EpsKoreaPage.findOne({});
    console.log('[EPS KOREA] Found page:', !!page, page ? `Title: ${page.title}` : 'NO DATA');

    if (!page) {
      // Try direct collection query
      const directResult = await EpsKoreaPage.collection.findOne({});
      console.log('[EPS KOREA] Direct collection query result:', !!directResult);
      if (directResult) {
        console.log('[EPS KOREA] Direct result title:', directResult.title);
        return res.json({ success: true, data: directResult });
      }
      console.log('[EPS KOREA] Returning 404 - no page found');
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    console.log('[EPS KOREA] Returning success with data');
    res.json({ success: true, data: page });
  } catch (err) {
    console.log('[EPS KOREA] Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.single('image'), async (req, res) => {
  try {
    const pageData = {
      title: req.body.title || '',
      description: req.body.description || '',
      image: req.body.image || ''
    };

    if (req.file) {
      pageData.image = `/uploads/emigrants/${req.file.filename}`;
    }

    const existingPage = await EpsKoreaPage.findOne({});
    const page = existingPage
      ? await EpsKoreaPage.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new EpsKoreaPage(pageData).save();

    res.status(200).json({ success: true, data: page });
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
