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
    console.log('🌱 Starting to seed Leadership items with correct image paths...\n');

    const leadership = await OurExecutivesPage.findOneAndUpdate(
      {},
      {
        $set: {
          navbar_description: 'Senior management and leadership team',
          leadership_items: [
            {
              title: 'Our Executives',
              image: 'http://localhost:3000/uploads/executives/minister.jpg',
              order: 0
            },
            {
              title: 'Managing Director',
              image: 'http://localhost:3000/uploads/executives/md.jpg',
              order: 1
            },
            {
              title: 'Board of Directors',
              image: 'http://localhost:3000/uploads/executives/board.png',
              order: 2
            }
          ]
        }
      },
      { upsert: true, new: true }
    );

    console.log('✅ Leadership items created with correct image paths:');
    leadership.leadership_items.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.title}`);
      console.log(`      Image: ${item.image}`);
    });

    console.log('\n🎉 Successfully seeded Leadership page!');
    console.log('\nYou can now:');
    console.log('1. Open admin panel: http://localhost:4200/about-us/our-executives');
    console.log('2. See all 3 images displayed (minister.jpg, md.jpg, board.png)');
    console.log('3. Upload new images to replace them');

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
