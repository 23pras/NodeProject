const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();



// middleware for app.post, express.json is middleware

// app.use(express.json());

// creating our own middleware

app.use(morgan('dev'));     // This is 3rd party middleware

app.use((req,res,next) =>{
  console.log("My Own Middleware !!!");
  next();
});

app.use((req, res, next) =>{
  req.requestTime = new Date().toISOString();
  next();
})
// we are writing read file function outside the app.get coz the top level code is executed only once and can be used later.

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// creating a get api which takes data from tours and sends whenever the particular api is hit.
// Route handlers. 1)

const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestedAt : req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
}

// 2)
const getTour = (req, res) => {
  console.log(req.params);

  // converting the string(id) into number (id)
  const id = req.params.id * 1;

  // checking if user enters the valid id

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // finding the requested id from the tours array
  const tour = tours.find((ele) => ele.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
}
// 3)

const createTour = (req, res) => {
  //console.log(req.body);
  // creating the new id for requested object.

  const newid = tours[tours.length - 1].id + 1;

  // creating new object related to that id.

  const newtour = Object.assign({ id: newid }, req.body);

  // now pushing that object of newtour to the tours which is array of objects (all tours).

  tours.push(newtour);

  // here we are saving the new tours list into our tours-simple.json file .

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newtour,
        },
      });
    }
  );
}

// 4)  

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    tours: '<Updated Tour here ...>',
  });
}

// 5)

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}


const getAllUsers = (req, res) => {
    res.status(500).json({
      status : 'Error',
      message: 'This route is not yet defined !!'
    })
}

const getUser = (req, res) => {
  res.status(500).json({
    status : 'Error',
    message: 'This route is not yet defined !!'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status : 'Error',
    message: 'This route is not yet defined !!'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status : 'Error',
    message: 'This route is not yet defined !!'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status : 'Error',
    message: 'This route is not yet defined !!'
  })
}


// creating a get api which takes data from tours and sends whenever the particular api is hit.

// app.get('/api/v1/tours', getAllTours);

// creating a get api for particular id, means details for one tour.

// app.get('/api/v1/tours/:id', getTour);

// creating a post api which post data of new tour received by that api request.

// app.post('/api/v1/tours', createTour);

// creating a patch api to edit the data

// app.patch('/api/v1/tours/:id', updateTour);

// creating a api to delete the data of some req id

// app.delete('/api/v1/tours/:id', deleteTour);


const tourRouter = express.Router();
const userRouter = express.Router();

// All our routes               

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// Mounting the routers 
app.use('/api/v1/tours',tourRouter);    // tourRouter is a middleware, used on route /api/v1/tours.
app.use('/api/v1/users',userRouter);   //tourRouter is a middleware, used on route /api/v1/users, we are mounting the router on route.

// Server starts

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});
