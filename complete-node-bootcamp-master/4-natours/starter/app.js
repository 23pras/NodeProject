const express = require('express');

const app = express();

// this will bring some data

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

// this will send and post the data to that url

app.post('/', (req, res) => {
  res.send('you can post to the end points...');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});
