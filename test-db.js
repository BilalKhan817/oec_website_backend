const mongoose = require('mongoose');
const EpsKoreaPage = require('./models/emigrants/eps-korea-page');

mongoose.connect('mongodb://localhost:27017/oec_website').then(async () => {
  const page = await EpsKoreaPage.findOne({});
  console.log('Found page:', !!page);
  if (page) {
    console.log('Title:', page.title);
    console.log('Description:', page.description);
    console.log('Image:', page.image);
    console.log('is_active:', page.is_active);
  } else {
    console.log('No page found in DB');
  }
  process.exit(0);
});
