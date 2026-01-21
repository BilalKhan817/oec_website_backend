/**
 * Migration Script: Convert Hardcoded Menu to Database
 *
 * This script creates the initial menu structure in the database
 * based on your current hardcoded navbar structure.
 *
 * Run with: node scripts/migrate-menu.js
 */

const mongoose = require('mongoose');
const MenuItem = require('../models/home/menu');

// MongoDB connection string - update if needed
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oec_database';

// Menu structure based on your current navbar
const menuStructure = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    link: '/home',
    link_type: 'internal',
    has_dropdown: false,
    is_active: true,
    order: 0
  },
  {
    title: 'About Us',
    icon: 'fas fa-info-circle',
    link_type: 'none',
    has_dropdown: true,
    dropdown_type: 'tabs',
    dropdown_width: '800px',
    is_active: true,
    order: 1,
    tabs: [
      {
        tab_title: 'Overview',
        tab_icon: 'fas fa-building',
        tab_id: 'about-overview',
        order: 0,
        items: [
          {
            title: 'About OEC',
            icon: 'fa-solid fa-building',
            description: 'Leading organization for overseas employment.',
            link: '/about-us',
            link_type: 'internal',
            expandable: true,
            order: 0
          },
          {
            title: 'OEC at Glance',
            icon: 'fas fa-eye',
            description: 'Comprehensive overview of our organization\'s structure, services, and impact.',
            link: '/oec-at-glance',
            link_type: 'internal',
            expandable: true,
            order: 1
          },
          {
            title: 'Governing Law',
            icon: 'fas fa-gavel',
            description: 'Legal framework and regulations governing overseas employment.',
            link: '/governing-law',
            link_type: 'internal',
            expandable: true,
            order: 2
          },
          {
            title: 'Our Functions',
            icon: 'fas fa-cogs',
            description: 'Core functions and services provided by OEC.',
            link: '/our-functions',
            link_type: 'internal',
            expandable: true,
            order: 3
          }
        ]
      },
      {
        tab_title: 'Leadership',
        tab_icon: 'fas fa-users',
        tab_id: 'about-leadership',
        order: 1,
        items: [
          {
            title: 'Our Executives',
            icon: 'fas fa-user-tie',
            image_url: '../../../assets/images/minister.jpg',
            link: '/our-executives',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Managing Director',
            icon: 'fas fa-user',
            image_url: '../../../assets/images/md.jpg',
            link: '/managing-director-message',
            link_type: 'internal',
            order: 1
          },
          {
            title: 'Board of Directors',
            icon: 'fas fa-users',
            image_url: '../../../assets/images/board.png',
            link: '/board-of-directors',
            link_type: 'internal',
            order: 2
          }
        ]
      },
      {
        tab_title: 'Mission & Vision',
        tab_icon: 'fas fa-bullseye',
        tab_id: 'about-mission',
        order: 2,
        items: [
          {
            title: 'Core Values',
            icon: 'fas fa-star',
            link: '/core-values',
            link_type: 'internal',
            order: 0
          }
        ]
      },
      {
        tab_title: 'Achievements',
        tab_icon: 'fas fa-trophy',
        tab_id: 'about-achievements',
        order: 3,
        items: [
          {
            title: 'Key Achievements',
            icon: 'fas fa-trophy',
            link: '/key-achievements',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Service Timelines',
            icon: 'fas fa-clock',
            link: '/service-timelines',
            link_type: 'internal',
            order: 1
          }
        ]
      },
      {
        tab_title: 'Why Choose OEC',
        tab_icon: 'fas fa-star',
        tab_id: 'about-why-choose',
        order: 4,
        items: [
          {
            title: 'Why Choose OEC',
            icon: 'fas fa-star',
            link: '/why-choose-oec',
            link_type: 'internal',
            order: 0
          }
        ]
      }
    ]
  },
  {
    title: 'Emigrants',
    icon: 'fas fa-suitcase',
    link_type: 'none',
    has_dropdown: true,
    dropdown_type: 'tabs',
    dropdown_width: '700px',
    is_active: true,
    order: 2,
    tabs: [
      {
        tab_title: 'EPS Korea',
        tab_icon: 'fas fa-flag',
        tab_id: 'emigrants-eps',
        order: 0,
        items: [
          {
            title: 'EPS Korea',
            icon: 'fas fa-flag',
            description: 'Employment Permit System - Government-to-government program for Korean employment',
            image_url: '../../../assets/images/eps.jpg',
            link: '/eps',
            link_type: 'internal',
            order: 0
          }
        ]
      },
      {
        tab_title: 'Services',
        tab_icon: 'fas fa-handshake',
        tab_id: 'emigrants-services',
        order: 1,
        items: [
          {
            title: 'Worker Protection',
            icon: 'fas fa-shield-alt',
            description: 'Comprehensive welfare services',
            link: '/protector-process-guide',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Pre-Departure Training',
            icon: 'fas fa-graduation-cap',
            description: 'Skills and cultural orientation',
            link: '/pre-departure-training',
            link_type: 'internal',
            order: 1
          },
          {
            title: 'Service Agreements',
            icon: 'fas fa-handshake',
            description: 'Foreign employment contracts',
            link: '/foreign-service-agreements',
            link_type: 'internal',
            order: 2
          }
        ]
      },
      {
        tab_title: 'Industries',
        tab_icon: 'fas fa-industry',
        tab_id: 'emigrants-industry',
        order: 2,
        items: [
          {
            title: 'Industries We Serve',
            icon: 'fas fa-industry',
            link: '/industries',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Fee Structure',
            icon: 'fas fa-dollar-sign',
            link: '/fees-structure',
            link_type: 'internal',
            order: 1
          }
        ]
      }
    ]
  },
  {
    title: 'Development Hub',
    icon: 'fas fa-rocket',
    link_type: 'none',
    has_dropdown: true,
    dropdown_type: 'mega',
    dropdown_width: '400px',
    is_active: true,
    order: 3,
    items: [
      {
        title: 'Success Stories',
        icon: 'fas fa-trophy',
        description: 'Worker achievements',
        link: '/success-stories',
        link_type: 'internal',
        order: 0
      },
      {
        title: 'Projects',
        icon: 'fas fa-project-diagram',
        description: 'Development initiatives',
        link: '/projects',
        link_type: 'internal',
        order: 1
      },
      {
        title: 'Future Plans',
        icon: 'fas fa-lightbulb',
        description: 'Strategic roadmap',
        link: '/future-plans',
        link_type: 'internal',
        order: 2
      },
      {
        title: 'MoUs',
        icon: 'fas fa-handshake',
        description: 'Partnerships',
        link: '/mous',
        link_type: 'internal',
        order: 3
      }
    ]
  },
  {
    title: 'Media Center',
    icon: 'fas fa-tv',
    link_type: 'none',
    has_dropdown: true,
    dropdown_type: 'tabs',
    dropdown_width: '600px',
    is_active: true,
    order: 4,
    tabs: [
      {
        tab_title: 'News',
        tab_icon: 'fas fa-newspaper',
        tab_id: 'media-news',
        order: 0,
        items: [
          {
            title: 'Latest Announcements',
            icon: 'fas fa-bullhorn',
            link: '/latest-announcements',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Press Releases',
            icon: 'fas fa-bullhorn',
            link: '/press-release',
            link_type: 'internal',
            order: 1
          },
          {
            title: 'News Highlights',
            icon: 'fas fa-highlight',
            link: '/news-highlights',
            link_type: 'internal',
            order: 2
          }
        ]
      },
      {
        tab_title: 'Events',
        tab_icon: 'fas fa-calendar',
        tab_id: 'media-events',
        order: 1,
        items: [
          {
            title: 'Pictures Gallery',
            icon: 'fas fa-images',
            description: 'Event photos and moments',
            image_url: '../../../assets/images/akmal_Sab.jpg',
            link: '/gallery',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Video Gallery',
            icon: 'fas fa-video',
            description: 'Documentary and interviews',
            image_url: '../../../assets/images/md.jpg',
            link: '/gallery',
            link_type: 'internal',
            order: 1
          }
        ]
      },
      {
        tab_title: 'Resources',
        tab_icon: 'fas fa-download',
        tab_id: 'media-resources',
        order: 2,
        items: [
          {
            title: 'Careers',
            icon: 'fas fa-briefcase',
            description: 'Job opportunities',
            link: '/careers',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Downloads',
            icon: 'fas fa-download',
            description: 'Forms & documents',
            link: '/document-downloads',
            link_type: 'internal',
            order: 1
          },
          {
            title: 'FAQs',
            icon: 'fas fa-question-circle',
            description: 'Common questions',
            link: '/faqs',
            link_type: 'internal',
            order: 2
          },
          {
            title: 'Useful Links',
            icon: 'fas fa-link',
            description: 'External resources',
            link: '/useful-links',
            link_type: 'internal',
            order: 3
          }
        ]
      }
    ]
  },
  {
    title: 'Reports & Analytics',
    icon: 'fas fa-chart-bar',
    link: '/report-statistics',
    link_type: 'internal',
    has_dropdown: false,
    is_active: true,
    order: 5
  },
  {
    title: 'Contact Us',
    icon: 'fas fa-phone',
    link_type: 'none',
    has_dropdown: true,
    dropdown_type: 'simple',
    dropdown_width: '320px',
    is_active: true,
    order: 6,
    items: [
      {
        title: 'Contact Us',
        icon: 'fas fa-comment',
        description: 'Send feedback',
        link: '/contact-us',
        link_type: 'internal',
        order: 0
      }
    ]
  }
];

async function migrateMenu() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    console.log('Clearing existing menu items...');
    await MenuItem.deleteMany({});
    console.log('Existing menu items cleared');

    console.log('Inserting new menu structure...');
    const result = await MenuItem.insertMany(menuStructure);
    console.log(`Successfully inserted ${result.length} menu items`);

    console.log('\nMenu Migration Complete!');
    console.log('You can now manage your menu from the admin dashboard.');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run migration
migrateMenu();
