// Generic route template generator
const fs = require('fs');
const path = require('path');

const createRoute = (modelName, routePath, uploadDir) => `const express = require("express");
const router = express.Router();
const ${modelName} = require("../../models/${routePath}");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/${uploadDir}/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const page = await ${modelName}.findOne({ is_active: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const pageData = { ...req.body };
    Object.keys(pageData).forEach(key => {
      if (typeof pageData[key] === 'string' && (pageData[key].startsWith('[') || pageData[key].startsWith('{'))) {
        try { pageData[key] = JSON.parse(pageData[key]); } catch(e) {}
      }
    });
    const existingPage = await ${modelName}.findOne({});
    const page = existingPage
      ? await ${modelName}.findByIdAndUpdate(existingPage._id, pageData, { new: true })
      : await new ${modelName}(pageData).save();
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const updateData = { ...req.body };
    Object.keys(updateData).forEach(key => {
      if (typeof updateData[key] === 'string' && (updateData[key].startsWith('[') || updateData[key].startsWith('{'))) {
        try { updateData[key] = JSON.parse(updateData[key]); } catch(e) {}
      }
    });
    const page = await ${modelName}.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
`;

// Routes to create
const routes = [
  { model: 'LabourContractsPage', path: 'emigrants/labour-contracts-page', dir: 'emigrants', file: 'labour-contracts-page.js' },
  { model: 'EpsResultsPage', path: 'emigrants/eps-results-page', dir: 'emigrants', file: 'eps-results-page.js' },
  { model: 'WorkerProtectionPage', path: 'emigrants/worker-protection-page', dir: 'emigrants', file: 'worker-protection-page.js' },
  { model: 'PreDepartureTrainingPage', path: 'emigrants/pre-departure-training-page', dir: 'emigrants', file: 'pre-departure-training-page.js' },
  { model: 'ServiceAgreementsPage', path: 'emigrants/service-agreements-page', dir: 'emigrants', file: 'service-agreements-page.js' },
];

routes.forEach(r => {
  const content = createRoute(r.model, r.path, r.dir);
  const filePath = path.join(__dirname, 'emigrants', r.file);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
});

console.log('All routes created!');
