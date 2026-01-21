const express = require("express");
const router = express.Router();
const ReportsAnalyticsPage = require("../../models/reports-analytics/reports-analytics-page");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reports-analytics/");
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

// GET reports & analytics page
router.get("/", async (req, res) => {
  try {
    const page = await ReportsAnalyticsPage.findOne({ is_active: true });
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create or update reports & analytics page
router.post("/", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.annual_reports)
      data.annual_reports = parseJSON(data.annual_reports);
    if (data.statistical_reports)
      data.statistical_reports = parseJSON(data.statistical_reports);
    if (data.performance_analytics)
      data.performance_analytics = parseJSON(data.performance_analytics);
    if (data.research_publications)
      data.research_publications = parseJSON(data.research_publications);
    if (data.data_visualizations)
      data.data_visualizations = parseJSON(data.data_visualizations);
    if (data.key_statistics)
      data.key_statistics = parseJSON(data.key_statistics);

    if (req.files && req.files.length > 0) {
      const annualReportFiles = req.files.filter(
        (f) => f.fieldname.startsWith("annual_report_")
      );
      const annualReportCoverFiles = req.files.filter(
        (f) => f.fieldname.startsWith("annual_report_cover_")
      );
      const statisticalReportFiles = req.files.filter(
        (f) => f.fieldname.startsWith("statistical_report_")
      );
      const researchPublicationFiles = req.files.filter(
        (f) => f.fieldname.startsWith("research_publication_")
      );
      const visualizationImageFiles = req.files.filter(
        (f) => f.fieldname.startsWith("visualization_image_")
      );
      const statisticIconFiles = req.files.filter(
        (f) => f.fieldname.startsWith("statistic_icon_")
      );

      if (annualReportFiles.length > 0 && data.annual_reports) {
        data.annual_reports = data.annual_reports.map((report, index) => ({
          ...report,
          file_url: annualReportFiles[index]
            ? annualReportFiles[index].path
            : report.file_url,
          file_size: annualReportFiles[index]
            ? (annualReportFiles[index].size / 1024).toFixed(2) + " KB"
            : report.file_size,
        }));
      }

      if (annualReportCoverFiles.length > 0 && data.annual_reports) {
        data.annual_reports = data.annual_reports.map((report, index) => ({
          ...report,
          cover_image: annualReportCoverFiles[index]
            ? annualReportCoverFiles[index].path
            : report.cover_image,
        }));
      }

      if (statisticalReportFiles.length > 0 && data.statistical_reports) {
        data.statistical_reports = data.statistical_reports.map(
          (report, index) => ({
            ...report,
            file_url: statisticalReportFiles[index]
              ? statisticalReportFiles[index].path
              : report.file_url,
            file_size: statisticalReportFiles[index]
              ? (statisticalReportFiles[index].size / 1024).toFixed(2) + " KB"
              : report.file_size,
          })
        );
      }

      if (researchPublicationFiles.length > 0 && data.research_publications) {
        data.research_publications = data.research_publications.map(
          (pub, index) => ({
            ...pub,
            file_url: researchPublicationFiles[index]
              ? researchPublicationFiles[index].path
              : pub.file_url,
          })
        );
      }

      if (visualizationImageFiles.length > 0 && data.data_visualizations) {
        data.data_visualizations = data.data_visualizations.map(
          (viz, index) => ({
            ...viz,
            image_url: visualizationImageFiles[index]
              ? visualizationImageFiles[index].path
              : viz.image_url,
          })
        );
      }

      if (statisticIconFiles.length > 0 && data.key_statistics) {
        data.key_statistics = data.key_statistics.map((stat, index) => ({
          ...stat,
          icon: statisticIconFiles[index]
            ? statisticIconFiles[index].path
            : stat.icon,
        }));
      }
    }

    let page = await ReportsAnalyticsPage.findOne();
    if (page) {
      page = await ReportsAnalyticsPage.findByIdAndUpdate(page._id, data, {
        new: true,
        runValidators: true,
      });
    } else {
      page = new ReportsAnalyticsPage(data);
      await page.save();
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update reports & analytics page by ID
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.annual_reports)
      data.annual_reports = parseJSON(data.annual_reports);
    if (data.statistical_reports)
      data.statistical_reports = parseJSON(data.statistical_reports);
    if (data.performance_analytics)
      data.performance_analytics = parseJSON(data.performance_analytics);
    if (data.research_publications)
      data.research_publications = parseJSON(data.research_publications);
    if (data.data_visualizations)
      data.data_visualizations = parseJSON(data.data_visualizations);
    if (data.key_statistics)
      data.key_statistics = parseJSON(data.key_statistics);

    if (req.files && req.files.length > 0) {
      const annualReportFiles = req.files.filter(
        (f) => f.fieldname.startsWith("annual_report_")
      );
      const annualReportCoverFiles = req.files.filter(
        (f) => f.fieldname.startsWith("annual_report_cover_")
      );
      const statisticalReportFiles = req.files.filter(
        (f) => f.fieldname.startsWith("statistical_report_")
      );
      const researchPublicationFiles = req.files.filter(
        (f) => f.fieldname.startsWith("research_publication_")
      );
      const visualizationImageFiles = req.files.filter(
        (f) => f.fieldname.startsWith("visualization_image_")
      );
      const statisticIconFiles = req.files.filter(
        (f) => f.fieldname.startsWith("statistic_icon_")
      );

      if (annualReportFiles.length > 0 && data.annual_reports) {
        data.annual_reports = data.annual_reports.map((report, index) => ({
          ...report,
          file_url: annualReportFiles[index]
            ? annualReportFiles[index].path
            : report.file_url,
          file_size: annualReportFiles[index]
            ? (annualReportFiles[index].size / 1024).toFixed(2) + " KB"
            : report.file_size,
        }));
      }

      if (annualReportCoverFiles.length > 0 && data.annual_reports) {
        data.annual_reports = data.annual_reports.map((report, index) => ({
          ...report,
          cover_image: annualReportCoverFiles[index]
            ? annualReportCoverFiles[index].path
            : report.cover_image,
        }));
      }

      if (statisticalReportFiles.length > 0 && data.statistical_reports) {
        data.statistical_reports = data.statistical_reports.map(
          (report, index) => ({
            ...report,
            file_url: statisticalReportFiles[index]
              ? statisticalReportFiles[index].path
              : report.file_url,
            file_size: statisticalReportFiles[index]
              ? (statisticalReportFiles[index].size / 1024).toFixed(2) + " KB"
              : report.file_size,
          })
        );
      }

      if (researchPublicationFiles.length > 0 && data.research_publications) {
        data.research_publications = data.research_publications.map(
          (pub, index) => ({
            ...pub,
            file_url: researchPublicationFiles[index]
              ? researchPublicationFiles[index].path
              : pub.file_url,
          })
        );
      }

      if (visualizationImageFiles.length > 0 && data.data_visualizations) {
        data.data_visualizations = data.data_visualizations.map(
          (viz, index) => ({
            ...viz,
            image_url: visualizationImageFiles[index]
              ? visualizationImageFiles[index].path
              : viz.image_url,
          })
        );
      }

      if (statisticIconFiles.length > 0 && data.key_statistics) {
        data.key_statistics = data.key_statistics.map((stat, index) => ({
          ...stat,
          icon: statisticIconFiles[index]
            ? statisticIconFiles[index].path
            : stat.icon,
        }));
      }
    }

    const page = await ReportsAnalyticsPage.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
