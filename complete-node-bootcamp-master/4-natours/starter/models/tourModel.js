const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A tour must have name"],
      unique: true,
      trim: true
    },
    slug: String,
    duration :{
      type: Number,
      required: [true, "A tour must have a duration"]
    },
    maxGroupSize :{
      type: Number,
      required: [true, "A tour must have a group size"]
    },
    difficulty :{
      type: String,
      required: [true, "A tour must have a string"]
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, "A tour must have Price"]
    },
    priceDiscount: Number,
    summary : {
      type: String,
      trim: true,
      required: [true, "A tour must have summary"]
    },
    description : {
      type: String,
      trim: true
    },
    imageCover :{
      type: String,
      required: [true, "A tour must have a image cover"]
    },
    images: [String],
    createdAt : {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates : [Date],
    secretTour : {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON : { virtuals: true},
    toObject : {virtuals : true}
  });
  
  tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7
  });

  // document middleware : runs before .save() and .create()

  tourSchema.pre('save', function(next){
     this.slug = slugify(this.name , {lower:true});
     next();
  });

  // tourSchema.post('save', function(doc,next){
  //    console.log("line 75  >>>  ", doc);
  //    next();
  // });

  //query middleware .

  // tourSchema.pre('find', function(next){
  tourSchema.pre(/^find/, function(next){
    this.find({secretTour :{$ne : true}});
    this.start = Date.now();
     next();
  });

 tourSchema.post(/^find/, function(docs, next){
  console.log( `query took ${Date.now() - this.start} milliseconds`);
  next();
 });

 // Aggreatrion Middleware
 
 tourSchema.pre('aggregate', function(next){
   this.pipeline().unshift({ $match : { secretTour : {$ne : true}}})
   console.log(" line 9999 >>>> ", this);
   next();
 });

  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;