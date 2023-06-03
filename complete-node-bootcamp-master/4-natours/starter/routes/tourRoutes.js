const express = require('express');
const fs = require('fs');

// importing the handlers from tourController.

const tourController = require('../controllers/tourControllers');

const router = express.Router();

// param middleware.
// router.param('id', tourController.checkID);

// chaining multiple middlewares functions.

router.route('/top-5-cheap').get(tourController.aliasTopTour, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
