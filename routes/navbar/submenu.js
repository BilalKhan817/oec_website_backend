const express = require("express");
const router = express.Router();
const NavbarSubmenu = require("../../models/navbar/submenu");
const NavbarMenu = require("../../models/navbar/menu");

// Get all submenus (optionally filter by menuId)
router.get("/", async (req, res) => {
  try {
    const { menuId, isActive } = req.query;
    let query = {};

    if (menuId) {
      query.menuId = menuId;
    }
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const submenus = await NavbarSubmenu.find(query)
      .populate('menuId', 'title slug')
      .sort({ order: 1 });
    res.json(submenus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submenus by menu slug
router.get("/menu/:menuSlug", async (req, res) => {
  try {
    const menu = await NavbarMenu.findOne({ slug: req.params.menuSlug });
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    const submenus = await NavbarSubmenu.find({
      menuId: menu._id,
      isActive: true
    }).sort({ order: 1 });

    res.json(submenus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one submenu
router.get("/:id", async (req, res) => {
  try {
    const submenu = await NavbarSubmenu.findById(req.params.id).populate('menuId', 'title slug');
    if (!submenu) return res.status(404).json({ message: "Submenu not found" });
    res.json(submenu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submenu by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const submenu = await NavbarSubmenu.findOne({ slug: req.params.slug }).populate('menuId', 'title slug');
    if (!submenu) return res.status(404).json({ message: "Submenu not found" });
    res.json(submenu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a submenu
router.post("/", async (req, res) => {
  try {
    // Verify the parent menu exists
    const menu = await NavbarMenu.findById(req.body.menuId);
    if (!menu) return res.status(404).json({ message: "Parent menu not found" });

    const submenu = new NavbarSubmenu({
      menuId: req.body.menuId,
      title: req.body.title,
      slug: req.body.slug,
      url: req.body.url,
      icon: req.body.icon,
      description: req.body.description,
      order: req.body.order || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      openInNewTab: req.body.openInNewTab || false,
      cssClass: req.body.cssClass,
    });

    const newSubmenu = await submenu.save();

    // Update parent menu to indicate it has submenus
    if (!menu.hasSubmenu) {
      await NavbarMenu.findByIdAndUpdate(req.body.menuId, { hasSubmenu: true });
    }

    res.status(201).json(newSubmenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a submenu
router.put("/:id", async (req, res) => {
  try {
    const updatedSubmenu = await NavbarSubmenu.findByIdAndUpdate(
      req.params.id,
      {
        menuId: req.body.menuId,
        title: req.body.title,
        slug: req.body.slug,
        url: req.body.url,
        icon: req.body.icon,
        description: req.body.description,
        order: req.body.order,
        isActive: req.body.isActive,
        openInNewTab: req.body.openInNewTab,
        cssClass: req.body.cssClass,
      },
      { new: true }
    );
    if (!updatedSubmenu) return res.status(404).json({ message: "Submenu not found" });
    res.json(updatedSubmenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a submenu
router.delete("/:id", async (req, res) => {
  try {
    const submenu = await NavbarSubmenu.findById(req.params.id);
    if (!submenu) return res.status(404).json({ message: "Submenu not found" });

    const menuId = submenu.menuId;
    await NavbarSubmenu.findByIdAndDelete(req.params.id);

    // Check if parent menu still has other submenus
    const remainingSubmenus = await NavbarSubmenu.countDocuments({ menuId });
    if (remainingSubmenus === 0) {
      await NavbarMenu.findByIdAndUpdate(menuId, { hasSubmenu: false });
    }

    res.json({ message: "Submenu deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reorder submenus
router.put("/reorder/bulk", async (req, res) => {
  try {
    const { submenuOrders } = req.body; // Array of { id, order }

    const updatePromises = submenuOrders.map(({ id, order }) =>
      NavbarSubmenu.findByIdAndUpdate(id, { order }, { new: true })
    );

    const updatedSubmenus = await Promise.all(updatePromises);
    res.json(updatedSubmenus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
