const fs = require('fs');

const Tour = require('../models/tourModel');
const { json } = require('express');


// function to get all the tours
exports.getAllTours = async (req, res) => {

 try {

  // 1a. building query & filtering

  const queryObj = {...req.query};

  const excludedFields = ['page','sort', 'limit','fields'];

  excludedFields.forEach(el => delete queryObj[el]);

  // 1b. advanced filtering 

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gte| gt|lte|lt)\b/g, match => `$${match}`);

  let query =  Tour.find(JSON.parse(queryStr));

  // 2. Sorting
  if(req.query.sort){
  let sortBy = req.query.sort.split(',').join(' ');
  query = query.sort(sortBy);
  }else{
    query = query.sort('-createdAt');
  }

  // 3 field limiting

   if(req.query.fields){
    let sortBy = req.query.fields.split(',').join(' ');
    query = query.select(sortBy);
    }else{
      query = query.select('-__v');
    }

 // executing

  const tours = await query;


  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
 } catch (error) {
  res.status(404).json({
    status : 'Failed cant get all tours',
    message : error
  })
 }
}
  
// 2) function to get a particular tour 

exports.getTour = async(req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status : 'Failed cant get the tour',
      message : error
    })
  }
  
    
}

// 3) To create a new Tour 
exports.createTour = async(req, res) => {

  try {
    
      const newTour = await Tour.create(req.body);

      res.status(201).json({
        status: 'Tour created successfully ! ',
        data: {
          tour: newTour,
        },
      });
      
  } catch (error) {
    res.status(400).json({
      status : 'Failed',
      message : error
    })
  }

}
  
// 4)  
  
exports.updateTour = async(req, res) => {

    try {
      const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators: true
      });

      res.status(200).json({
        status: 'success',
        data: {
          tour: updateTour,
        },
      });

    } catch (error) {
      res.status(404).json({
        status : 'Failed',
        message : error
      })
    }

}
  
// 5)
  
exports.deleteTour = async(req, res) => {

try {
  await Tour.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success, tour deleted',
    data: {
      tour: "Deleted ",
    },
  });
} catch (error) {
  res.status(404).json({
    status : 'Failed',
    message : error
  })
}
  }
  