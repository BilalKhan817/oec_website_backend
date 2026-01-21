const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const OecAtGlancePage = require('./models/about-us/oec-at-glance-page');
const GoverningLawPage = require('./models/about-us/governing-law-page');
const OurFunctionsPage = require('./models/about-us/our-functions-page');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oec_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function seedNewFields() {
  try {
    console.log('🌱 Starting to seed new fields...\n');

    // OEC at Glance - Add established_year and workers_sent
    const oecAtGlance = await OecAtGlancePage.findOneAndUpdate(
      {},
      {
        $set: {
          established_year: '1976',
          workers_sent: '11M+',
          navbar_description: 'Comprehensive overview of our organization\'s structure, services, and impact.'
        }
      },
      { upsert: true, new: true }
    );
    console.log('✅ OEC at Glance updated:');
    console.log('   - Established Year:', oecAtGlance.established_year);
    console.log('   - Workers Sent:', oecAtGlance.workers_sent);
    console.log('   - Navbar Description:', oecAtGlance.navbar_description);

    // Governing Law - Add legal_points
    const governingLaw = await GoverningLawPage.findOneAndUpdate(
      {},
      {
        $set: {
          legal_points: [
            'Emigration Ordinance 1979',
            'Emigration Rules 1979',
            'OEC Act 1976'
          ],
          navbar_description: 'Legal framework and regulations governing overseas employment.'
        }
      },
      { upsert: true, new: true }
    );
    console.log('\n✅ Governing Law updated:');
    console.log('   - Legal Points:', governingLaw.legal_points);
    console.log('   - Navbar Description:', governingLaw.navbar_description);

    // Our Functions - Add function_points
    const ourFunctions = await OurFunctionsPage.findOneAndUpdate(
      {},
      {
        $set: {
          function_points: [
            'Worker Registration',
            'Employment Promotion'
          ],
          navbar_description: 'Core functions and services provided by OEC.'
        }
      },
      { upsert: true, new: true }
    );
    console.log('\n✅ Our Functions updated:');
    console.log('   - Function Points:', ourFunctions.function_points);
    console.log('   - Navbar Description:', ourFunctions.navbar_description);

    console.log('\n🎉 Successfully seeded all new fields!');
    console.log('\nYou can now:');
    console.log('1. Open admin panel and see these values');
    console.log('2. Edit them from the admin panel');
    console.log('3. Add/remove points in Governing Law and Our Functions');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding new fields:', error);
    process.exit(1);
  }
}

db.once('open', () => {
  console.log('📦 Connected to MongoDB\n');
  seedNewFields();
});
