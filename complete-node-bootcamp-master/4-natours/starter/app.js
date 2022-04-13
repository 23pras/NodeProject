const fs = require('fs');
const express = require('express');

const app = express();

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

app.get('/api/v1/tours/', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});
