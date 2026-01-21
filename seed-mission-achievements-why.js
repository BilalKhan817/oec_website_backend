const mongoose = require('mongoose');
require('dotenv').config();

// Import models
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

async function seedPages() {
  try {
    console.log('🌱 Starting to seed Mission & Vision, Achievements, and Why Choose OEC pages...\n');

    // Mission & Vision
    const missionVision = await MissionVisionPage.findOneAndUpdate(
      {},
      {
        $set: {
          navbar_description: 'Our mission, vision and core values',
          mission_title: 'Our Mission',
          mission_statement: 'To facilitate safe, legal, and dignified overseas employment opportunities for Pakistani workers, ensuring their rights and welfare while contributing to national development.',
          vision_title: 'Our Vision',
          vision_statement: 'To be the leading organization in overseas employment services, recognized for excellence, integrity, and commitment to worker welfare.'
        }
      },
      { upsert: true, new: true }
    );
    console.log('✅ Mission & Vision updated:');
    console.log('   - Mission Title:', missionVision.mission_title);
    console.log('   - Mission Statement:', missionVision.mission_statement);
    console.log('   - Vision Title:', missionVision.vision_title);
    console.log('   - Vision Statement:', missionVision.vision_statement);

    // Achievements
    const achievements = await AchievementsPage.findOneAndUpdate(
      {},
      {
        $set: {
          navbar_description: 'Milestones and accomplishments',
          key_achievements: [
            'Successfully sent 11M+ workers overseas',
            'Established partnerships with 50+ countries',
            'Awarded Best Employment Services 2023',
            'Launched digital worker registration system'
          ],
          service_timelines: [
            '1976 - OEC Established',
            '1985 - First International Partnership',
            '2000 - Digital Transformation Initiated',
            '2010 - Worker Protection Program Launched',
            '2020 - Online Services Portal Launched',
            '2023 - 11 Million Workers Milestone'
          ]
        }
      },
      { upsert: true, new: true }
    );
    console.log('\n✅ Achievements updated:');
    console.log('   - Key Achievements:', achievements.key_achievements);
    console.log('   - Service Timelines:', achievements.service_timelines);

    // Why Choose OEC
    const whyChoose = await WhyChooseOecPage.findOneAndUpdate(
      {},
      {
        $set: {
          navbar_description: 'Reasons to choose OEC for overseas employment',
          why_choose_text: 'OEC is Pakistan\'s premier organization for overseas employment, offering comprehensive services and unwavering support to workers seeking opportunities abroad.',
          key_advantages: [
            'Government-backed credibility and trust',
            'Comprehensive worker protection services',
            'Free registration and placement assistance',
            'Legal support and documentation help',
            'Pre-departure orientation and training',
            'Post-employment support and grievance handling',
            'Partnerships with reputed international employers',
            'Transparent and corruption-free processes'
          ]
        }
      },
      { upsert: true, new: true }
    );
    console.log('\n✅ Why Choose OEC updated:');
    console.log('   - Why Choose Text:', whyChoose.why_choose_text);
    console.log('   - Key Advantages:', whyChoose.key_advantages);

    console.log('\n🎉 Successfully seeded all pages!');
    console.log('\nYou can now:');
    console.log('1. Open admin panel and see these values');
    console.log('2. Edit them from the admin panel');
    console.log('3. Add/remove items in arrays');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding pages:', error);
    process.exit(1);
  }
}

db.once('open', () => {
  console.log('📦 Connected to MongoDB\n');
  seedPages();
});
