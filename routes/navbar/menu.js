const express = require("express");
const router = express.Router();
const NavbarMenu = require("../../models/navbar/menu");
const NavbarSubmenu = require("../../models/navbar/submenu");

// Get all menus with their submenus
router.get("/", async (req, res) => {
  try {
    const { isActive } = req.query;
    let query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const menus = await NavbarMenu.find(query).sort({ order: 1 });

    // Fetch submenus for each menu
    const menusWithSubmenus = await Promise.all(
      menus.map(async (menu) => {
        const submenus = await NavbarSubmenu.find({
          menuId: menu._id,
          isActive: true
        }).sort({ order: 1 });

        return {
          ...menu.toObject(),
          submenus: submenus
        };
      })
    );

    res.json(menusWithSubmenus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get complete navbar structure (for frontend)
router.get("/structure", async (req, res) => {
  try {
    const menus = await NavbarMenu.find({ isActive: true }).sort({ order: 1 });

    const navbarStructure = await Promise.all(
      menus.map(async (menu) => {
        const submenus = await NavbarSubmenu.find({
          menuId: menu._id,
          isActive: true
        }).sort({ order: 1 });

        return {
          _id: menu._id,
          title: menu.title,
          slug: menu.slug,
          url: menu.url,
          icon: menu.icon,
          hasSubmenu: menu.hasSubmenu,
          openInNewTab: menu.openInNewTab,
          cssClass: menu.cssClass,
          submenus: submenus.map(sub => ({
            _id: sub._id,
            title: sub.title,
            slug: sub.slug,
            url: sub.url,
            icon: sub.icon,
            description: sub.description,
            openInNewTab: sub.openInNewTab,
            cssClass: sub.cssClass,
          }))
        };
      })
    );

    res.json(navbarStructure);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one menu
router.get("/:id", async (req, res) => {
  try {
    const menu = await NavbarMenu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    const submenus = await NavbarSubmenu.find({ menuId: menu._id }).sort({ order: 1 });

    res.json({
      ...menu.toObject(),
      submenus: submenus
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get menu by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const menu = await NavbarMenu.findOne({ slug: req.params.slug });
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    const submenus = await NavbarSubmenu.find({ menuId: menu._id, isActive: true }).sort({ order: 1 });

    res.json({
      ...menu.toObject(),
      submenus: submenus
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a menu
router.post("/", async (req, res) => {
  const menu = new NavbarMenu({
    title: req.body.title,
    slug: req.body.slug,
    url: req.body.url,
    icon: req.body.icon,
    hasSubmenu: req.body.hasSubmenu || false,
    order: req.body.order || 0,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    openInNewTab: req.body.openInNewTab || false,
    cssClass: req.body.cssClass,
  });

  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a menu
router.put("/:id", async (req, res) => {
  try {
    const updatedMenu = await NavbarMenu.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        slug: req.body.slug,
        url: req.body.url,
        icon: req.body.icon,
        hasSubmenu: req.body.hasSubmenu,
        order: req.body.order,
        isActive: req.body.isActive,
        openInNewTab: req.body.openInNewTab,
        cssClass: req.body.cssClass,
      },
      { new: true }
    );
    if (!updatedMenu) return res.status(404).json({ message: "Menu not found" });
    res.json(updatedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a menu (and its submenus)
router.delete("/:id", async (req, res) => {
  try {
    // First delete all submenus
    await NavbarSubmenu.deleteMany({ menuId: req.params.id });

    // Then delete the menu
    const deletedMenu = await NavbarMenu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) return res.status(404).json({ message: "Menu not found" });

    res.json({ message: "Menu and its submenus deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reorder menus
router.put("/reorder/bulk", async (req, res) => {
  try {
    const { menuOrders } = req.body; // Array of { id, order }

    const updatePromises = menuOrders.map(({ id, order }) =>
      NavbarMenu.findByIdAndUpdate(id, { order }, { new: true })
    );

    const updatedMenus = await Promise.all(updatePromises);
    res.json(updatedMenus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
