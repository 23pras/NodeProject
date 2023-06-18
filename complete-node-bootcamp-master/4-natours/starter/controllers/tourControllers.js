const fs = require('fs');
const APIfeatures = require('../utils/apiFeatures');
const Tour = require('../models/tourModel');
const { json } = require('express');
const { error } = require('console');


exports.aliasTopTour = (req,res,next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
  next();
};

// function to get all the tours
exports.getAllTours = async (req, res) => {

    try {

        // executing
          const features = new APIfeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
          const tours = await features.query;


          res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
              tours,
            },
          });
    } 
    catch (error) {
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

exports.tourStats = async(req, res)=>{
   try {
      const stats = await Tour.aggregate([
        {
          $match : { ratingsAverage : {$gte :4.5}}
        },
        {
          $group : { 
             _id : {$toUpper : '$difficulty'},
            // _id : '$ratingsAverage',
             numTours : {$sum :1},
             numRating: { $sum : '$ratingsQuantity'},
             avgRating: { $avg : '$ratingsAverage'},
             avgPrice: { $avg : '$price'},
             minPrice: { $min : '$price'},
             maxPrice: { $max : '$price'},

          }
        },
        {
          $sort : { avgPrice: 1 }
        },
        // {
        //   $match : {_id : { $ne : 'EASY'}}
        // }
      ]);

      res.status(200).json({
        status: 'success',
        data: {
          stats
        },
      });
      
   } catch (error) {
    res.status(404).json({
      status : 'Failed',
      message : error
    })
   }
} 
  

exports.getMonthlyPlans = async(req,res)=>{
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([{
      $unwind : '$startDates'
      },
      {
        $match : {
          startDates : {
            $gte: new Date(`${year}-01-01`),
            $lte :new Date(`${year}-12-31`)
          }
        }
      },{
        $group : {
          _id : { $month : '$startDates'},
          numTourStarts : {$sum :1},
          Tours: {$push : '$name'}
        }
      },
      {
        $addFields : { month : '$_id'}
      },
      {
        $project : {
          _id : 0
        }
      },
      {
        $sort : {numTourStarts : -1}
      },
      {
        $limit : 12
      }
  ]);


    res.status(200).json({
      status: 'success',
      length : plan.length,
      data: {
        plan
      },
    });
  } catch (error) {
    res.status(404).json({
      status : 'Failed',
      message : error
    })
  }
}