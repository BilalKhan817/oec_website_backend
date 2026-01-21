const mongoose = require('mongoose');
require('dotenv').config();

// Import model
const OurExecutivesPage = require('./models/about-us/our-executives-page');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oec_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function seedLeadership() {
  try {
    console.log('🌱 Starting to seed Leadership items...\n');

    const leadership = await OurExecutivesPage.findOneAndUpdate(
      {},
      {
        $set: {
          navbar_description: 'Senior management and leadership team',
          leadership_items: [
            {
              title: 'Our Executives',
              link: 'Meet Team →',
              order: 0,
              image: '' // You'll upload images from admin panel
            },
            {
              title: 'Managing Director',
              link: 'Read Message →',
              order: 1,
              image: ''
            },
            {
              title: 'Board of Directors',
              link: 'View Board →',
              order: 2,
              image: ''
            }
          ]
        }
      },
      { upsert: true, new: true }
    );

    console.log('✅ Leadership items created:');
    leadership.leadership_items.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.title} (${item.link})`);
    });

    console.log('\n🎉 Successfully seeded Leadership page!');
    console.log('\nYou can now:');
    console.log('1. Open admin panel: http://localhost:4200/about-us/our-executives');
    console.log('2. Upload images for each leadership item');
    console.log('3. Edit titles and links as needed');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding leadership:', error);
    process.exit(1);
  }
}

db.once('open', () => {
  console.log('📦 Connected to MongoDB\n');
  seedLeadership();
});
