const mongoose = require('mongoose');
const EpsKoreaPage = require('./models/emigrants/eps-korea-page');
const LabourContractsPage = require('./models/emigrants/labour-contracts-page');
const EpsResultsPage = require('./models/emigrants/eps-results-page');
const ServiceAgreementsPage = require('./models/emigrants/service-agreements-page');
const IndustriesPage = require('./models/emigrants/industries-page');

mongoose.connect('mongodb://localhost:27017/oec_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const epsKoreaData = {
  title: 'Employment Permit System',
  description: 'Government-to-government program for Korean employment',
  image: 'https://oec.gov.pk/uploads/executives/eps.jpg'
};

const labourContractsData = {
  description: 'Standard employment contracts for Korean employment.',
  points: [
    'Contract Duration: 3 Years',
    'Minimum Wage: ₩9,160/hour',
    'Working Hours: 40 hours/week'
  ]
};

const epsResultsData = {
  description: 'Latest test results and selection outcomes.',
  points: [
    '15,000+ Selected 2024',
    '85% Success Rate'
  ]
};

const serviceAgreementsData = {
  service_boxes: [
    {
      title: 'Worker Protection',
      description: 'Comprehensive welfare services',
      order: 0
    },
    {
      title: 'Pre-Departure Training',
      description: 'Skills and cultural orientation',
      order: 1
    },
    {
      title: 'Service Agreements',
      description: 'Foreign employment contracts',
      order: 2
    }
  ]
};

const industriesData = {
  industries_we_serve: [
    'Manufacturing - High Demand',
    'Construction - Moderate',
    'Fisheries - Seasonal',
    'Agriculture - Growing'
  ],
  fee_structure: [
    'Registration Fee: PKR 2,000',
    'Processing Fee: PKR 5,000',
    'Protector Fee: PKR 15,000',
    'Total: PKR 22,000'
  ]
};

async function seed() {
  try {
    await EpsKoreaPage.deleteMany({});
    await LabourContractsPage.deleteMany({});
    await EpsResultsPage.deleteMany({});
    await ServiceAgreementsPage.deleteMany({});
    await IndustriesPage.deleteMany({});

    await EpsKoreaPage.create(epsKoreaData);
    await LabourContractsPage.create(labourContractsData);
    await EpsResultsPage.create(epsResultsData);
    await ServiceAgreementsPage.create(serviceAgreementsData);
    await IndustriesPage.create(industriesData);

    console.log('All Emigrants pages seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Emigrants pages:', error);
    process.exit(1);
  }
}

seed();
