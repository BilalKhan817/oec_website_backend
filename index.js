const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.get('/', (req, res) => {
  res.json({ message: 'Working!' });
});

const MONGODB_URI = 'mongodb://127.0.0.1:27017/OEC'
// process.env.NODE_ENV === 'production'
// ? `mongodb+srv://identifymobile:customer_portal123@cluster0.clgyudy.mongodb.net/customer_portal`
// `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`
 // : `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
// `mongodb+srv://identifymobile:customer_portal123@cluster0.clgyudy.mongodb.net/customer_portal`
// `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
//  : `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
//const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
// mongoose.set('useFindAndModify', false)
// mongoose.set('useCreateIndex', true)
// mongoose.set('useNewUrlParser', true)
// mongoose.set('reconnectInterval', 500);
// mongoose.set('connectTimeoutMS', 10000);
// mongoose.set('reconnectTries', Number.MAX_VALUE);
 mongoose
   .connect(MONGODB_URI)
   .then(() => {
     console.log('MongoDB is connected')
   })
   .catch((err) => {
     console.error(err)
     console.log('%s MongoDB connection error: %s', chalk.red('✗'), err)
   })

app.listen(3000, () => {
  console.log('Server running on port 3000');
});