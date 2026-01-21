const express = require("express");
const mongoose = require('mongoose');
const EpsKoreaPage = require("./models/emigrants/eps-korea-page");

mongoose.connect('mongodb://localhost:27017/oec_website').then(async () => {
  console.log('Connected to MongoDB');

  const page = await EpsKoreaPage.findOne({});
  console.log('Direct DB query result:');
  console.log('  Found:', !!page);
  if (page) {
    console.log('  Title:', page.title);
    console.log('  Description:', page.description);
    console.log('  _id:', page._id);
  }

  // Test the route handler logic
  try {
    const page2 = await EpsKoreaPage.findOne({});
    if (!page2) {
      console.log('\nRoute would return: Page not found');
    } else {
      console.log('\nRoute would return: success with data');
    }
  } catch (err) {
    console.log('\nRoute would return error:', err.message);
  }

  process.exit(0);
});
