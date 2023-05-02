const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

// dotenv.config({ path: './config.env' });

dotenv.config({ path: `${__dirname}/../../config.env` });

// const Tour = require('./models/tourModel');

// environment variables are global variables that are used to define the env in which the node app is running, its set by express
// console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
//const DB = process.env.DATABASE;

mongoose.connect(DB, {
// mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex : true,
  useFindAndModify: false,
  useUnifiedTopology: true 
}).then( (res)=>{
  console.log('DB connection established >> ')  
});

// read json file 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//import data into db
const importData = async () =>{
  try {
    await Tour.create(tours);
    console.log('data loaded successfully ! ');
  } catch (error) {
    console.log("Error from import data >> ", error);
  }
  process.exit();
};

// delete all data from db.
const deleteData = async () =>{
    try {
        await Tour.deleteMany();
        console.log('data deleted successfully ! ');
      } catch (error) {
        console.log("Error from delete data >> ", error);
      }
      process.exit();

};


if(process.argv[2]==='--import'){
  importData();
} else if(process.argv[2]==='--delete'){
  deleteData();
}

// console.log("line 50 >>", process.argv);