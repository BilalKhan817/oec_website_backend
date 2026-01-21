const mongoose = require('mongoose');
const LatestAnnouncement = require('./models/media-center/latest-announcement');
const PressRelease = require('./models/media-center/press-release');
const NewsHighlight = require('./models/media-center/news-highlight');
const Event = require('./models/media-center/event');

mongoose.connect('mongodb://localhost:27017/oec_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const latestAnnouncementData = {
  title: 'Latest Announcements',
  image: 'https://oec.gov.pk/uploads/executives/eps_2.jpg',
  points: [
    'EPS Korea 2024 Results Announced',
    'New Training Programs Launched'
  ],
  order: 0
};

const pressReleaseData = {
  points: [
    {
      title: 'Q4 2024 Performance',
      date: 'Dec 15, 2024'
    },
    {
      title: 'New Partnership MoU',
      date: 'Dec 10, 2024'
    }
  ],
  order: 0
};

const newsHighlightData = {
  points: [
    'Record remittances in 2024',
    'Excellence award received'
  ],
  order: 0
};

const eventsData = [
  {
    title: 'Pictures Gallery',
    description: 'Event photos and moments',
    image: 'https://oec.gov.pk/uploads/executives/akmal_Sab.jpg',
    order: 0
  },
  {
    title: 'Video Gallery',
    description: 'Documentary and interviews',
    image: 'https://oec.gov.pk/uploads/executives/md.jpg',
    order: 1
  }
];

async function seed() {
  try {
    await LatestAnnouncement.deleteMany({});
    await PressRelease.deleteMany({});
    await NewsHighlight.deleteMany({});
    await Event.deleteMany({});

    await LatestAnnouncement.create(latestAnnouncementData);
    await PressRelease.create(pressReleaseData);
    await NewsHighlight.create(newsHighlightData);
    await Event.insertMany(eventsData);

    console.log('Media Center seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Media Center:', error);
    process.exit(1);
  }
}

seed();
