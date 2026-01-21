/**
 * COMPLETE Header Migration Script
 *
 * This migrates EVERYTHING from your current header:
 * 1. Top Bar Buttons (Employer, OEP, Job Seeker, EPS Korea, Soft Skills)
 * 2. All Navigation Menus with exact tabs and sub-items
 *
 * Run with: node scripts/migrate-complete-header.js
 */

const mongoose = require('mongoose');
const MenuItem = require('../models/home/menu');
const TopBarButton = require('../models/home/topBarButtons');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oec_database';

// Top Bar Buttons (Green Header)
const topBarButtons = [
  {
    title: 'Employer',
    icon: 'fas fa-briefcase',
    link: '/foreign-employer',
    link_type: 'internal',
    button_style: 'default',
    show_on_mobile: true,
    is_active: true,
    order: 0
  },
  {
    title: 'OEP',
    icon: 'fas fa-user-tie',
    link: '/oep',
    link_type: 'internal',
    button_style: 'default',
    show_on_mobile: true,
    is_active: true,
    order: 1
  },
  {
    title: 'Job Seeker',
    icon: 'fas fa-search',
    link: 'https://jobs.oec.gov.pk/home',
    link_type: 'external',
    button_style: 'default',
    show_on_mobile: true,
    is_active: true,
    order: 2
  },
  {
    title: 'EPS Korea',
    icon: 'fas fa-star',
    link: '/eps',
    link_type: 'internal',
    button_style: 'highlight',
    show_on_mobile: true,
    is_active: true,
    order: 3
  },
  {
    title: 'Soft Skills',
    icon: 'fas fa-star',
    link: 'https://softskills.oec.gov.pk/',
    link_type: 'external',
    button_style: 'default',
    show_on_mobile: false,
    is_active: true,
    order: 4
  }
];

// Complete Menu Structure with ALL tabs and items
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
            expand_content: 'Learn about our organization, history, and mission.',
            order: 0
          },
          {
            title: 'OEC at Glance',
            icon: 'fas fa-eye',
            description: 'Comprehensive overview of our organization.',
            link: '/oec-at-glance',
            link_type: 'internal',
            expandable: true,
            expand_content: 'Established: 1976, Workers Sent: 11M+',
            order: 1
          },
          {
            title: 'Governing Law',
            icon: 'fas fa-gavel',
            description: 'Legal framework and regulations.',
            link: '/governing-law',
            link_type: 'internal',
            expandable: true,
            expand_content: 'Emigration Ordinance 1979, Rules 1979, OEC Act 1976',
            order: 2
          },
          {
            title: 'Our Functions',
            icon: 'fas fa-cogs',
            description: 'Core functions and services.',
            link: '/our-functions',
            link_type: 'internal',
            expandable: true,
            expand_content: 'Worker Registration, Employment Promotion',
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
            description: 'Senior Management',
            image_url: '../../../assets/images/minister.jpg',
            link: '/our-executives',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Managing Director',
            icon: 'fas fa-user',
            description: 'Executive Leadership',
            image_url: '../../../assets/images/md.jpg',
            link: '/managing-director-message',
            link_type: 'internal',
            order: 1
          },
          {
            title: 'Board of Directors',
            icon: 'fas fa-users',
            description: 'Governance Body',
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
            description: 'Our core values and principles',
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
            description: '150K+ Workers Sent, $150B+ Remittances',
            link: '/key-achievements',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Service Timelines',
            icon: 'fas fa-clock',
            description: 'Registration: 1-2 days, Processing: 7-10 days',
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
            icon: 'fas fa-shield-alt',
            description: 'Government Owned, Transparent Process',
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
            title: 'Employment Permit System',
            icon: 'fas fa-file-contract',
            description: 'Government-to-government program',
            image_url: '../../../assets/images/eps.jpg',
            link: '/eps',
            link_type: 'internal',
            expandable: true,
            expand_content: 'Contract Duration: 3 Years, Min Wage: ₩9,160/hour',
            order: 0
          },
          {
            title: 'Labour Contracts',
            icon: 'fas fa-file-contract',
            description: 'Standard employment contracts',
            link: '/labour-contracts',
            link_type: 'internal',
            order: 1
          },
          {
            title: 'EPS Results',
            icon: 'fas fa-chart-line',
            description: 'Latest test results',
            link: '/eps-results',
            link_type: 'internal',
            order: 2
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
            description: 'Manufacturing, Construction, Fisheries, Agriculture',
            link: '/industries',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Fee Structure',
            icon: 'fas fa-dollar-sign',
            description: 'Registration, Processing, Protector Fees',
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
            image_url: '../../../assets/images/eps_2.jpg',
            link: '/latest-announcements',
            link_type: 'internal',
            order: 0
          },
          {
            title: 'Press Releases',
            icon: 'fas fa-bullhorn',
            description: 'Official press releases',
            link: '/press-release',
            link_type: 'internal',
            expandable: true,
            order: 1
          },
          {
            title: 'News Highlights',
            icon: 'fas fa-highlight',
            description: 'Important highlights',
            link: '/news-highlights',
            link_type: 'internal',
            expandable: true,
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

async function migrateCompleteHeader() {
  try {
    console.log('========================================');
    console.log('COMPLETE HEADER MIGRATION');
    console.log('========================================\n');

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected successfully\n');

    // Migrate Top Bar Buttons
    console.log('1. Migrating Top Bar Buttons...');
    await TopBarButton.deleteMany({});
    const buttonResults = await TopBarButton.insertMany(topBarButtons);
    console.log(`✓ Inserted ${buttonResults.length} top bar buttons`);
    console.log('  - Employer');
    console.log('  - OEP');
    console.log('  - Job Seeker');
    console.log('  - EPS Korea');
    console.log('  - Soft Skills\n');

    // Migrate Menu Items
    console.log('2. Migrating Navigation Menus...');
    await MenuItem.deleteMany({});
    const menuResults = await MenuItem.insertMany(menuStructure);
    console.log(`✓ Inserted ${menuResults.length} menu items`);
    menuResults.forEach(item => {
      const tabInfo = item.tabs ? ` (${item.tabs.length} tabs)` : '';
      const itemInfo = item.items ? ` (${item.items.length} items)` : '';
      console.log(`  - ${item.title}${tabInfo}${itemInfo}`);
    });

    console.log('\n========================================');
    console.log('✓ MIGRATION COMPLETE!');
    console.log('========================================');
    console.log('\nYour header is now fully dynamic!');
    console.log('Manage everything from the admin dashboard.\n');

  } catch (error) {
    console.error('\n✗ Migration failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run migration
migrateCompleteHeader();
