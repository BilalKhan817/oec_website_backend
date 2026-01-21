const mongoose = require('mongoose');
const DevelopmentHub = require('./models/us-submenu/development-hub');

mongoose.connect('mongodb://localhost:27017/oec_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const developmentHubData = [
  {
    title: 'Success Stories',
    description: 'Worker achievements',
    order: 0
  },
  {
    title: 'Projects',
    description: 'Development initiatives',
    order: 1
  },
  {
    title: 'Future Plans',
    description: 'Strategic roadmap',
    order: 2
  },
  {
    title: 'MoUs',
    description: 'Partnerships',
    order: 3
  }
];

async function seed() {
  try {
    await DevelopmentHub.deleteMany({});
    await DevelopmentHub.insertMany(developmentHubData);
    console.log('Development Hub seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Development Hub:', error);
    process.exit(1);
  }
}

seed();
