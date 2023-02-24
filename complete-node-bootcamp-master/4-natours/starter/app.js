const express = require('express');
const morgan = require('morgan');

// here i am exporting these routers for using in routes folder
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// This is 3rd party middleware
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));  
}

app.use(express.json()); 
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) =>{
  console.log("My Own Middleware !!!");
  next();
});

app.use((req, res, next) =>{
  req.requestTime = new Date().toISOString();
  next();
})

// Mounting the middleware on route with the help of app.use 
app.use('/api/v1/tours',tourRouter);    // tourRouter is a middleware, used on route /api/v1/tours.
app.use('/api/v1/users',userRouter);   //userRouter is a middleware, used on route /api/v1/users, we are mounting the router on route.

module.exports = app;

// testing push
