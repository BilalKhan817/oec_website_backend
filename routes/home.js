const express = require('express');
const router = express.Router();
const Announcement = require('../models/home/announcements');
const Banner = require('../models/home/banner');
const AboutOec = require('../models/home/aboutOec');
const Executive = require('../models/home/executive');
const Services = require('../models/home/services');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/banners';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'banner-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create uploads directory if it doesn't exist
const uploadDir_executives = 'uploads/executives';
if (!fs.existsSync(uploadDir_executives)) {
  fs.mkdirSync(uploadDir_executives, { recursive: true });
}

// Multer configuration for executive images
const storage_executives = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir_executives);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'executive-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
const upload_storage_executives = multer({
  storage: storage_executives,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
/////////////////////////////
//////// Announcements /////
////////////////////////////

// GET - Retrieve all announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements',
      error: error.message
    });
  }
});

// GET - Retrieve a single announcement by ID
router.get('/announcements/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching announcement',
      error: error.message
    });
  }
});

// POST - Create a new announcement
router.post('/announcements', async (req, res) => {
  try {
    const {
      title,
      deadline,
      announcement_category,
      orange_button_title,
      orange_button_link,
      blue_button_title,
      blue_button_link
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'title', 'deadline', 'announcement_category',
      'orange_button_title', 'orange_button_link',
      'blue_button_title', 'blue_button_link'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Create new announcement
    const newAnnouncement = new Announcement({
      title,
      deadline: new Date(deadline),
      announcement_category,
      orange_button_title,
      orange_button_link,
      blue_button_title,
      blue_button_link
    });

    const savedAnnouncement = await newAnnouncement.save();

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: savedAnnouncement
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating announcement',
      error: error.message
    });
  }
});

// PUT - Update an announcement by ID
router.put('/announcements/:id', async (req, res) => {
  try {
    const {
      title,
      deadline,
      announcement_category,
      orange_button_title,
      orange_button_link,
      blue_button_title,
      blue_button_link
    } = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title,
        deadline: deadline ? new Date(deadline) : undefined,
        announcement_category,
        orange_button_title,
        orange_button_link,
        blue_button_title,
        blue_button_link
      },
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: updatedAnnouncement
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating announcement',
      error: error.message
    });
  }
});

// DELETE - Delete an announcement by ID
router.delete('/announcements/:id', async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
      data: deletedAnnouncement
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting announcement',
      error: error.message
    });
  }
});


/////////////////////////////
//////// Banners /////
////////////////////////////


// GET - Retrieve all banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners
    });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching banners',
      error: error.message
    });
  }
});

// GET - Retrieve active banners only
router.get('/banners/active', async (req, res) => {
  try {
    const banners = await Banner.find({ is_active: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners
    });
  } catch (error) {
    console.error('Error fetching active banners:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active banners',
      error: error.message
    });
  }
});

// GET - Retrieve a single banner by ID
router.get('/banners/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: banner
    });
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching banner',
      error: error.message
    });
  }
});

// POST - Create a new banner with image upload
router.post('/banners', upload.single('background_image'), async (req, res) => {
  try {
    const {
      banner_title,
      banner_title_color,
      banner_title_highlight_text,
      banner_title_highlight_color,
      banner_subtitle,
      banner_subtitle_type,
      support_message,
      green_button,
      green_button_link,
      gray_button,
      gray_button_link,
      is_active
    } = req.body;

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Background image is required'
      });
    }

    // Validate required fields (removed banner_subtitle since it's optional now)
    const requiredFields = [
      'banner_title', 'banner_subtitle_type', 'green_button', 'green_button_link',
      'gray_button', 'gray_button_link'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      // Delete uploaded file if validation fails
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Validate banner_subtitle_type
    if (!['text', 'points', 'none'].includes(banner_subtitle_type)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'banner_subtitle_type must be "text", "points", or "none"'
      });
    }

    // Parse banner_subtitle based on type
    let parsedSubtitle = null;
    
    if (banner_subtitle_type === 'none') {
      parsedSubtitle = null;
    } else if (banner_subtitle_type === 'points') {
      if (banner_subtitle) {
        try {
          parsedSubtitle = JSON.parse(banner_subtitle);
          if (!Array.isArray(parsedSubtitle)) {
            throw new Error('Must be an array');
          }
        } catch (e) {
          fs.unlinkSync(req.file.path);
          return res.status(400).json({
            success: false,
            message: 'banner_subtitle must be a valid JSON array when banner_subtitle_type is "points"'
          });
        }
      } else {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'banner_subtitle is required when banner_subtitle_type is "points"'
        });
      }
    } else if (banner_subtitle_type === 'text') {
      if (banner_subtitle) {
        parsedSubtitle = banner_subtitle;
      } else {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'banner_subtitle is required when banner_subtitle_type is "text"'
        });
      }
    }

    // Create new banner
    const newBanner = new Banner({
      background_image: `/uploads/banners/${req.file.filename}`,
      banner_title,
      banner_title_color: banner_title_color || '#FFFFFF',
      banner_title_highlight: {
        text: banner_title_highlight_text || '',
        color: banner_title_highlight_color || '#FFD700'
      },
      banner_subtitle: parsedSubtitle,
      banner_subtitle_type,
      support_message: support_message || "Making your overseas journey easier and comfortable with comprehensive support services.",
      green_button,
      green_button_link,
      gray_button,
      gray_button_link,
      is_active: is_active !== undefined ? is_active === 'true' : true
    });

    const savedBanner = await newBanner.save();

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: savedBanner
    });
  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error creating banner:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating banner',
      error: error.message
    });
  }
});

// PUT - Update a banner by ID with optional image upload
router.put('/banners/:id', upload.single('background_image'), async (req, res) => {
  try {
    const {
      banner_title,
      banner_title_color,
      banner_title_highlight_text,
      banner_title_highlight_color,
      banner_subtitle,
      banner_subtitle_type,
      support_message,
      green_button,
      green_button_link,
      gray_button,
      gray_button_link,
      is_active
    } = req.body;

    // Find existing banner
    const existingBanner = await Banner.findById(req.params.id);
    if (!existingBanner) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    // Validate banner_subtitle_type if provided
    if (banner_subtitle_type && !['text', 'points'].includes(banner_subtitle_type)) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'banner_subtitle_type must be either "text" or "points"'
      });
    }

    // Parse banner_subtitle if provided
    let parsedSubtitle = banner_subtitle;
    if (banner_subtitle && banner_subtitle_type === 'points') {
      try {
        parsedSubtitle = JSON.parse(banner_subtitle);
        if (!Array.isArray(parsedSubtitle)) {
          throw new Error('Must be an array');
        }
      } catch (e) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: 'banner_subtitle must be a valid JSON array when banner_subtitle_type is "points"'
        });
      }
    }

    // Validate banner_subtitle based on type if both are provided
    if (banner_subtitle_type && banner_subtitle) {
      if (banner_subtitle_type === 'text' && typeof parsedSubtitle !== 'string') {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: 'banner_subtitle must be a string when banner_subtitle_type is "text"'
        });
      }
    }

    const updateData = {};
    
    // Handle image update
    if (req.file) {
      // Delete old image file
      const oldImagePath = path.join('.', existingBanner.background_image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateData.background_image = `/uploads/banners/${req.file.filename}`;
    }
    
    // Only update fields that are provided
    if (banner_title !== undefined) updateData.banner_title = banner_title;
    if (banner_title_color !== undefined) updateData.banner_title_color = banner_title_color;
    if (banner_title_highlight_text !== undefined || banner_title_highlight_color !== undefined) {
      updateData.banner_title_highlight = {
        text: banner_title_highlight_text || existingBanner.banner_title_highlight?.text || '',
        color: banner_title_highlight_color || existingBanner.banner_title_highlight?.color || '#FFD700'
      };
    }
    if (banner_subtitle !== undefined) updateData.banner_subtitle = parsedSubtitle;
    if (banner_subtitle_type !== undefined) updateData.banner_subtitle_type = banner_subtitle_type;
    if (support_message !== undefined) updateData.support_message = support_message;
    if (green_button !== undefined) updateData.green_button = green_button;
    if (green_button_link !== undefined) updateData.green_button_link = green_button_link;
    if (gray_button !== undefined) updateData.gray_button = gray_button;
    if (gray_button_link !== undefined) updateData.gray_button_link = gray_button_link;
    if (is_active !== undefined) updateData.is_active = is_active === 'true';

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: updatedBanner
    });
  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error updating banner:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating banner',
      error: error.message
    });
  }
});

// DELETE - Delete a banner by ID
router.delete('/banners/:id', async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    // Delete associated image file
    const imagePath = path.join('.', deletedBanner.background_image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({
      success: true,
      message: 'Banner deleted successfully',
      data: deletedBanner
    });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting banner',
      error: error.message
    });
  }
});

// PATCH - Toggle banner active status
router.patch('/banners/:id/toggle', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    banner.is_active = !banner.is_active;
    const updatedBanner = await banner.save();

    res.status(200).json({
      success: true,
      message: `Banner ${updatedBanner.is_active ? 'activated' : 'deactivated'} successfully`,
      data: updatedBanner
    });
  } catch (error) {
    console.error('Error toggling banner status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling banner status',
      error: error.message
    });
  }
});



/////////////////////////////
//////// About OEC /////
////////////////////////////





// GET - Retrieve About OEC data
router.get('/about-oec', async (req, res) => {
  try {
    const aboutOec = await AboutOec.findOne({ is_active: true });
    
    if (!aboutOec) {
      return res.status(404).json({
        success: false,
        message: 'About OEC data not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: aboutOec
    });
  } catch (error) {
    console.error('Error fetching About OEC:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching About OEC data',
      error: error.message
    });
  }
});

// POST - Create About OEC data
router.post('/about-oec', async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description_paragraph_1,
      description_paragraph_2,
      established_year,
      workers_sent,
      youtube_video_id,
      video_title,
      button_text,
      button_link,
      is_active
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'description_paragraph_1', 'description_paragraph_2', 'youtube_video_id'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Deactivate existing records if this one is active
    if (is_active !== false) {
      await AboutOec.updateMany({}, { is_active: false });
    }

    const newAboutOec = new AboutOec({
      title: title || "About OEC",
      subtitle: subtitle || "Building Careers, Connecting Nations Since 1976",
      description_paragraph_1,
      description_paragraph_2,
      established_year: established_year || "1976",
      workers_sent: workers_sent || "11M+",
      youtube_video_id,
      video_title: video_title || "A brief introduction about Overseas Employment Corporation",
      button_text: button_text || "Learn More About OEC",
      button_link: button_link || "/about",
      is_active: is_active !== undefined ? is_active : true
    });

    const savedAboutOec = await newAboutOec.save();

    res.status(201).json({
      success: true,
      message: 'About OEC created successfully',
      data: savedAboutOec
    });
  } catch (error) {
    console.error('Error creating About OEC:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating About OEC',
      error: error.message
    });
  }
});

// PUT - Update About OEC data
router.put('/about-oec/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If setting this record as active, deactivate others
    if (updateData.is_active === true) {
      await AboutOec.updateMany({ _id: { $ne: req.params.id } }, { is_active: false });
    }

    const updatedAboutOec = await AboutOec.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedAboutOec) {
      return res.status(404).json({
        success: false,
        message: 'About OEC data not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'About OEC updated successfully',
      data: updatedAboutOec
    });
  } catch (error) {
    console.error('Error updating About OEC:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating About OEC',
      error: error.message
    });
  }
});

// DELETE - Delete About OEC data
router.delete('/about-oec/:id', async (req, res) => {
  try {
    const deletedAboutOec = await AboutOec.findByIdAndDelete(req.params.id);

    if (!deletedAboutOec) {
      return res.status(404).json({
        success: false,
        message: 'About OEC data not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'About OEC deleted successfully',
      data: deletedAboutOec
    });
  } catch (error) {
    console.error('Error deleting About OEC:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting About OEC',
      error: error.message
    });
  }
});






//////////////////////////////////
//////// Meet our leadership /////
/////////////////////////////////


// GET - Get all executives
router.get('/executives', async (req, res) => {
  try {
    const executives = await Executive.find({ is_active: true }).sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      count: executives.length,
      data: executives
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching executives',
      error: error.message
    });
  }
});

// GET - Get single executive
router.get('/executives/:id', async (req, res) => {
  try {
    const executive = await Executive.findById(req.params.id);
    
    if (!executive) {
      return res.status(404).json({
        success: false,
        message: 'Executive not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: executive
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching executive',
      error: error.message
    });
  }
});

// POST - Create single executive
router.post('/executives', upload_storage_executives.single('executive_image'), async (req, res) => {
  try {
    const { name, position, badge, profile_url, order, is_active } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Executive image is required'
      });
    }

    const requiredFields = ['name', 'position', 'badge', 'profile_url'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }

    const newExecutive = new Executive({
      name,
      position,
      badge,
      image_url: `/uploads/executives/${req.file.filename}`,
      profile_url,
      order: order || 1,
      is_active: is_active !== undefined ? is_active === 'true' : true
    });

    const savedExecutive = await newExecutive.save();

    res.status(201).json({
      success: true,
      message: 'Executive created successfully',
      data: savedExecutive
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: 'Error creating executive',
      error: error.message
    });
  }
});

// PUT - Update executive
router.put('/executives/:id', upload_storage_executives.single('executive_image'), async (req, res) => {
  try {
    const existingExecutive = await Executive.findById(req.params.id);
    if (!existingExecutive) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Executive not found'
      });
    }

    const updateData = { ...req.body };
    
    // Handle image update
    if (req.file) {
      // Delete old image
      if (existingExecutive.image_url.startsWith('/uploads/')) {
        const oldImagePath = path.join('.', existingExecutive.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image_url = `/uploads/executives/${req.file.filename}`;
    }

    if (updateData.is_active !== undefined) {
      updateData.is_active = updateData.is_active === 'true';
    }

    const updatedExecutive = await Executive.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Executive updated successfully',
      data: updatedExecutive
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: 'Error updating executive',
      error: error.message
    });
  }
});

// DELETE - Delete executive
router.delete('/executives/:id', async (req, res) => {
  try {
    const deletedExecutive = await Executive.findByIdAndDelete(req.params.id);

    if (!deletedExecutive) {
      return res.status(404).json({
        success: false,
        message: 'Executive not found'
      });
    }

    // Delete image file
    if (deletedExecutive.image_url.startsWith('/uploads/')) {
      const imagePath = path.join('.', deletedExecutive.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Executive deleted successfully',
      data: deletedExecutive
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting executive',
      error: error.message
    });
  }
});








//////////////////////////////////
//////// Services //////////////
/////////////////////////////////



// GET - Retrieve Services data
router.get('/services', async (req, res) => {
  try {
    const services = await Services.findOne({ is_active: true });
    
    if (!services) {
      return res.status(404).json({
        success: false,
        message: 'Services data not found'
      });
    }
    
    // Sort services by order
    services.services.sort((a, b) => a.order - b.order);
    
    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching Services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching Services data',
      error: error.message
    });
  }
});

// POST - Create Services data
router.post('/services', async (req, res) => {
  try {
    const {
      section_title,
      section_subtitle,
      services,
      is_active
    } = req.body;

    // Validate required fields
    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one service is required'
      });
    }

    // Validate service fields
    for (let service of services) {
      if (!service.title || !service.description || !service.icon) {
        return res.status(400).json({
          success: false,
          message: 'All service fields (title, description, icon) are required'
        });
      }
    }

    // Deactivate existing records if this one is active
    if (is_active !== false) {
      await Services.updateMany({}, { is_active: false });
    }

    const newServices = new Services({
      section_title: section_title || "Our Services",
      section_subtitle: section_subtitle || "Comprehensive employment solutions for job seekers and employers",
      services,
      is_active: is_active !== undefined ? is_active : true
    });

    const savedServices = await newServices.save();

    res.status(201).json({
      success: true,
      message: 'Services created successfully',
      data: savedServices
    });
  } catch (error) {
    console.error('Error creating Services:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating Services',
      error: error.message
    });
  }
});

// PUT - Update Services data
router.put('/services/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If setting this record as active, deactivate others
    if (updateData.is_active === true) {
      await Services.updateMany({ _id: { $ne: req.params.id } }, { is_active: false });
    }

    const updatedServices = await Services.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedServices) {
      return res.status(404).json({
        success: false,
        message: 'Services data not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Services updated successfully',
      data: updatedServices
    });
  } catch (error) {
    console.error('Error updating Services:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating Services',
      error: error.message
    });
  }
});

// DELETE - Delete Services data
router.delete('/services/:id', async (req, res) => {
  try {
    const deletedServices = await Services.findByIdAndDelete(req.params.id);

    if (!deletedServices) {
      return res.status(404).json({
        success: false,
        message: 'Services data not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Services deleted successfully',
      data: deletedServices
    });
  } catch (error) {
    console.error('Error deleting Services:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting Services',
      error: error.message
    });
  }
});


module.exports = router;