const express = require('express');

const app = require('./app');

// Server starts

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port num ${port}... `);
});