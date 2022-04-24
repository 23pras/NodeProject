const fs = require('fs');


// we are writing read file function outside the app.get coz the top level code is executed only once and can be used later.
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

// creating a get api which takes data from tours and sends whenever the particular api is hit.
// Route handlers. 1)

exports.getAllTours = (req, res) => {
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
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
  
exports.updateTour = (req, res) => {
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
  
exports.deleteTour = (req, res) => {
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
  