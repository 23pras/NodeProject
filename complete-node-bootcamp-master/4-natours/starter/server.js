const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// environment variables are global variables that are used to define the env in which the node app is running, its set by express
// console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
//const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex : true,
  useFindAndModify: false,
  useUnifiedTopology: true 
}).then( ()=>{
  console.log('DB connection established')  
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have name"],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, "A tour must have Price"]
  }
});

const Tour = mongoose.model('Tour');

// Server starts
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});

