const mongoose = require('mongoose');
require('dotenv').config();

const NavbarMenu = require('../models/navbar/menu');
const NavbarSubmenu = require('../models/navbar/submenu');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/announcements_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const navbarData = [
  {
    title: "Home",
    slug: "home",
    url: "/",
    order: 1,
    hasSubmenu: false,
    isActive: true
  },
  {
    title: "About Us",
    slug: "about-us",
    url: "/about-us",
    order: 2,
    hasSubmenu: true,
    isActive: true,
    submenus: [
      { title: "Board of Directors", slug: "board-of-directors", url: "/about-us/board-of-directors", order: 1 },
      { title: "Partnerships", slug: "partnerships", url: "/about-us/partnerships", order: 2 },
      { title: "Our Team", slug: "our-team", url: "/about-us/our-team", order: 3 },
      { title: "Vision & Mission", slug: "vision-mission", url: "/about-us/vision-mission", order: 4 }
    ]
  },
  {
    title: "Emigrants",
    slug: "emigrants",
    url: "/emigrants",
    order: 3,
    hasSubmenu: true,
    isActive: true,
    submenus: [
      { title: "Registration", slug: "registration", url: "/emigrants/registration", order: 1 },
      { title: "Services", slug: "services", url: "/emigrants/services", order: 2 },
      { title: "Support Programs", slug: "support-programs", url: "/emigrants/support-programs", order: 3 }
    ]
  },
  {
    title: "Development Hub",
    slug: "development-hub",
    url: "/development-hub",
    order: 4,
    hasSubmenu: true,
    isActive: true,
    submenus: [
      { title: "Projects", slug: "projects", url: "/development-hub/projects", order: 1 },
      { title: "Initiatives", slug: "initiatives", url: "/development-hub/initiatives", order: 2 },
      { title: "Investment Opportunities", slug: "investment-opportunities", url: "/development-hub/investment-opportunities", order: 3 }
    ]
  },
  {
    title: "Media Center",
    slug: "media-center",
    url: "/media-center",
    order: 5,
    hasSubmenu: true,
    isActive: true,
    submenus: [
      { title: "News", slug: "news", url: "/media-center/news", order: 1 },
      { title: "Videos", slug: "videos", url: "/media-center/videos", order: 2 },
      { title: "Photo Gallery", slug: "photo-gallery", url: "/media-center/photo-gallery", order: 3 },
      { title: "Press Releases", slug: "press-releases", url: "/media-center/press-releases", order: 4 }
    ]
  },
  {
    title: "Reports & Analytics",
    slug: "reports-analytics",
    url: "/reports-analytics",
    order: 6,
    hasSubmenu: true,
    isActive: true,
    submenus: [
      { title: "Annual Reports", slug: "annual-reports", url: "/reports-analytics/annual-reports", order: 1 },
      { title: "Quarterly Reports", slug: "quarterly-reports", url: "/reports-analytics/quarterly-reports", order: 2 },
      { title: "Research & Studies", slug: "research-studies", url: "/reports-analytics/research-studies", order: 3 },
      { title: "Statistics", slug: "statistics", url: "/reports-analytics/statistics", order: 4 }
    ]
  },
  {
    title: "Contact Us",
    slug: "contact-us",
    url: "/contact-us",
    order: 7,
    hasSubmenu: false,
    isActive: true
  }
];

async function initializeNavbar() {
  try {
    // Clear existing data
    await NavbarMenu.deleteMany({});
    await NavbarSubmenu.deleteMany({});
    console.log('Cleared existing navbar data');

    // Insert menus and submenus
    for (const menuData of navbarData) {
      const { submenus, ...menuFields } = menuData;

      // Create menu
      const menu = new NavbarMenu(menuFields);
      const savedMenu = await menu.save();
      console.log(`Created menu: ${savedMenu.title}`);

      // Create submenus if any
      if (submenus && submenus.length > 0) {
        for (const submenuData of submenus) {
          const submenu = new NavbarSubmenu({
            ...submenuData,
            menuId: savedMenu._id,
            isActive: true
          });
          await submenu.save();
          console.log(`  - Created submenu: ${submenu.title}`);
        }
      }
    }

    console.log('\nNavbar initialization completed successfully!');
    console.log('\nYou can now access the navbar structure at:');
    console.log('GET /api/navbar/menus/structure - For frontend display');
    console.log('GET /api/navbar/menus - For admin panel management');
    console.log('GET /api/navbar/submenus - For submenu management');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing navbar:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeNavbar();
