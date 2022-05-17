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

// Server starts
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});

