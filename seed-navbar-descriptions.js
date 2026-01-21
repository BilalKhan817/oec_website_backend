const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const AboutOecPage = require('./models/about-us/about-oec-page');
const GoverningLawPage = require('./models/about-us/governing-law-page');
const OecAtGlancePage = require('./models/about-us/oec-at-glance-page');
const OurFunctionsPage = require('./models/about-us/our-functions-page');
const OurExecutivesPage = require('./models/about-us/our-executives-page');
const MdMessagePage = require('./models/about-us/md-message-page');
const MissionVisionPage = require('./models/about-us/mission-vision-page');
const AchievementsPage = require('./models/about-us/achievements-page');
const WhyChooseOecPage = require('./models/about-us/why-choose-oec-page');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oec_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function seedNavbarDescriptions() {
  try {
    console.log('🌱 Starting to seed navbar descriptions...\n');

    // About OEC
    const aboutOec = await AboutOecPage.findOneAndUpdate(
      {},
      {
        title: 'About OEC',
        navbar_description: 'Leading organization for overseas employment.',
        introduction: 'The Overseas Employment Corporation (OEC) is Pakistan\'s leading organization for overseas employment.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ About OEC - navbar_description saved:', aboutOec.navbar_description);

    // Governing Law
    const governingLaw = await GoverningLawPage.findOneAndUpdate(
      {},
      {
        title: 'Governing Law',
        navbar_description: 'Legal framework and regulations governing overseas employment.',
        introduction: 'Legal framework governing overseas employment in Pakistan.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Governing Law - navbar_description saved:', governingLaw.navbar_description);

    // OEC at Glance
    const oecAtGlance = await OecAtGlancePage.findOneAndUpdate(
      {},
      {
        title: 'OEC at a Glance',
        navbar_description: 'Comprehensive overview of our organization\'s structure, services, and impact.',
        introduction: 'Quick facts and statistics about OEC.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ OEC at Glance - navbar_description saved:', oecAtGlance.navbar_description);

    // Our Functions
    const ourFunctions = await OurFunctionsPage.findOneAndUpdate(
      {},
      {
        title: 'Our Functions',
        navbar_description: 'Core functions and services provided by OEC.',
        introduction: 'Core functions and services provided by the Overseas Employment Corporation.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Our Functions - navbar_description saved:', ourFunctions.navbar_description);

    // Our Executives
    const ourExecutives = await OurExecutivesPage.findOneAndUpdate(
      {},
      {
        title: 'Our Executives',
        navbar_description: 'Senior management and leadership team',
        introduction: 'Meet our senior management and leadership team.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Our Executives - navbar_description saved:', ourExecutives.navbar_description);

    // MD Message
    const mdMessage = await MdMessagePage.findOneAndUpdate(
      {},
      {
        title: 'Managing Director Message',
        navbar_description: 'Message from the Managing Director',
        md_name: 'Managing Director',
        md_designation: 'Managing Director',
        message: 'Welcome message from the Managing Director.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ MD Message - navbar_description saved:', mdMessage.navbar_description);

    // Mission & Vision
    const missionVision = await MissionVisionPage.findOneAndUpdate(
      {},
      {
        title: 'Mission & Vision',
        navbar_description: 'Our mission, vision and core values',
        mission: 'To facilitate safe, legal, and dignified overseas employment opportunities for Pakistani workers.',
        vision: 'To be the leading organization in overseas employment services.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Mission & Vision - navbar_description saved:', missionVision.navbar_description);

    // Achievements
    const achievements = await AchievementsPage.findOneAndUpdate(
      {},
      {
        title: 'Achievements',
        navbar_description: 'Milestones and accomplishments',
        introduction: 'Key achievements and milestones of OEC.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Achievements - navbar_description saved:', achievements.navbar_description);

    // Why Choose OEC
    const whyChooseOec = await WhyChooseOecPage.findOneAndUpdate(
      {},
      {
        title: 'Why Choose OEC',
        navbar_description: 'Reasons to choose OEC for overseas employment',
        introduction: 'Discover why OEC is your best choice for overseas employment.',
        is_active: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Why Choose OEC - navbar_description saved:', whyChooseOec.navbar_description);

    console.log('\n🎉 Successfully seeded all navbar descriptions!');
    console.log('\nYou can now:');
    console.log('1. Open admin panel and see these descriptions');
    console.log('2. Edit them from the admin panel');
    console.log('3. See the changes on the website navbar');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding navbar descriptions:', error);
    process.exit(1);
  }
}

db.once('open', () => {
  console.log('📦 Connected to MongoDB\n');
  seedNavbarDescriptions();
});
