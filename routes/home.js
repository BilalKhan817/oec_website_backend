const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcements');
const Banner = require('../models/banner');



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

// POST - Create a new banner
router.post('/banners', async (req, res) => {
  try {
    const {
      background_image,
      banner_title,
      banner_title_color,
      banner_subtitle,
      banner_subtitle_type,
      green_button,
      green_button_link,
      gray_button,
      gray_button_link,
      is_active
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'background_image', 'banner_title', 'banner_subtitle',
      'banner_subtitle_type', 'green_button', 'green_button_link',
      'gray_button', 'gray_button_link'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Validate banner_subtitle_type
    if (!['text', 'points'].includes(banner_subtitle_type)) {
      return res.status(400).json({
        success: false,
        message: 'banner_subtitle_type must be either "text" or "points"'
      });
    }

    // Validate banner_subtitle based on type
    if (banner_subtitle_type === 'points' && !Array.isArray(banner_subtitle)) {
      return res.status(400).json({
        success: false,
        message: 'banner_subtitle must be an array when banner_subtitle_type is "points"'
      });
    }

    if (banner_subtitle_type === 'text' && typeof banner_subtitle !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'banner_subtitle must be a string when banner_subtitle_type is "text"'
      });
    }

    // Create new banner
    const newBanner = new Banner({
      background_image,
      banner_title,
      banner_title_color: banner_title_color || '#FFFFFF',
      banner_subtitle,
      banner_subtitle_type,
      green_button,
      green_button_link,
      gray_button,
      gray_button_link,
      is_active: is_active !== undefined ? is_active : true
    });

    const savedBanner = await newBanner.save();

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: savedBanner
    });
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating banner',
      error: error.message
    });
  }
});

// PUT - Update a banner by ID
router.put('/banners/:id', async (req, res) => {
  try {
    const {
      background_image,
      banner_title,
      banner_title_color,
      banner_subtitle,
      banner_subtitle_type,
      green_button,
      green_button_link,
      gray_button,
      gray_button_link,
      is_active
    } = req.body;

    // Validate banner_subtitle_type if provided
    if (banner_subtitle_type && !['text', 'points'].includes(banner_subtitle_type)) {
      return res.status(400).json({
        success: false,
        message: 'banner_subtitle_type must be either "text" or "points"'
      });
    }

    // Validate banner_subtitle based on type if both are provided
    if (banner_subtitle_type && banner_subtitle) {
      if (banner_subtitle_type === 'points' && !Array.isArray(banner_subtitle)) {
        return res.status(400).json({
          success: false,
          message: 'banner_subtitle must be an array when banner_subtitle_type is "points"'
        });
      }

      if (banner_subtitle_type === 'text' && typeof banner_subtitle !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'banner_subtitle must be a string when banner_subtitle_type is "text"'
        });
      }
    }

    const updateData = {};
    
    // Only update fields that are provided
    if (background_image !== undefined) updateData.background_image = background_image;
    if (banner_title !== undefined) updateData.banner_title = banner_title;
    if (banner_title_color !== undefined) updateData.banner_title_color = banner_title_color;
    if (banner_subtitle !== undefined) updateData.banner_subtitle = banner_subtitle;
    if (banner_subtitle_type !== undefined) updateData.banner_subtitle_type = banner_subtitle_type;
    if (green_button !== undefined) updateData.green_button = green_button;
    if (green_button_link !== undefined) updateData.green_button_link = green_button_link;
    if (gray_button !== undefined) updateData.gray_button = gray_button;
    if (gray_button_link !== undefined) updateData.gray_button_link = gray_button_link;
    if (is_active !== undefined) updateData.is_active = is_active;

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: updatedBanner
    });
  } catch (error) {
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

module.exports = router;