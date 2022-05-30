const fs = require('fs');

const Tour = require('../models/tourModel');


// creating a get api which takes data from tours and sends whenever the particular api is hit.
// Route handlers. 1)

// exports.checkID = (req, res, next,value) => {
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// }

// exports.checkBody = (req, res, next) => {
//   if(!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: '',
//       message: 'Missing name or price'
//     });
//   }
//    next();s
// }

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
      status: 'success',
      requestedAt : req.requestTime,
      // results: tours.length,
      // data: {
      //   tours,
      // },
    });
}
  
// 2)
exports.getTour = (req, res) => {
    console.log(req.params);
  
    // converting the string(id) into number (id)
    const id = req.params.id * 1;
  
    // finding the requested id from the tours array
    // const tour = tours.find((ele) => ele.id === id);
  
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tours: tour,
    //   },
    // });
}

// 3)
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newtour,
    // },
  });

}
  
// 4)  
  
exports.updateTour = (req, res) => {

      res.status(200).json({
      status: 'success',
      tours: '<Updated Tour here ...>',
    });
}
  
// 5)
  
exports.deleteTour = (req, res) => {

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
  