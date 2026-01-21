const mongoose = require('mongoose');
const EpsKoreaPage = require('./models/emigrants/eps-korea-page');

mongoose.connect('mongodb://localhost:27017/oec_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = {
  title: 'EPS Korea - Employment Permit System',
  description: 'The Employment Permit System (EPS) is a government-to-government program between Bangladesh and South Korea that allows Bangladeshi workers to work in South Korea. This program ensures legal employment, fair wages, and proper working conditions.',
  image: ''
};

async function seed() {
  try {
    await EpsKoreaPage.deleteMany({});
    await EpsKoreaPage.create(seedData);
    console.log('EPS Korea page seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding EPS Korea page:', error);
    process.exit(1);
  }
}

seed();
