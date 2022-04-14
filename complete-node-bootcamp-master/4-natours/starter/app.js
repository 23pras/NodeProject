const fs = require('fs');
const express = require('express');

const app = express();

// middleware for app.post, express.json is middleware

app.use(express.json());

// this will bring some data

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// // this will send and post the data to that url

// app.post('/', (req, res) => {
//   res.send('you can post to the end points...');
// });

// we are writing read file function outside the app.get coz the top level code is executed only once and can be used later.

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// creating a get api which takes data from tours and sends whenever the particular api is hit.

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// creating a get api for particular id, means details for one tour.

app.get('/api/v1/tours/:id', (req, res) => {
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
});

// creating a post api which post data of new tour received by that api request.

app.post('/api/v1/tours', (req, res) => {
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
});

// creating a patch api to edit the data

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// creating a api to delete the data of some req id

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});
