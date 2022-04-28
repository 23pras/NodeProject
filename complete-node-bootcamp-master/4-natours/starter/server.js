const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const app = require('./app');


// environment variables are global variables that are used to define the env in which the node app is running, its set by express
// console.log(process.env);

// Server starts

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});