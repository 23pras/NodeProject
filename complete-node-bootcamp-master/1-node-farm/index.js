const fs = require('fs');     // fs is a module which have so many functions which we will be using. 

// const hello = "Hello World";
// console.log(hello);

// This readFileSync func is reading a files data from a location.

const textIn = fs.readFileSync('./starter/txt/input.txt' , 'utf-8');
//console.log(textIn);


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

const textAdded = `this is about avocado : ${textIn}.\ncreated on ${dateTime}`;
console.log(textAdded);

// This write fun is creating a file at a location and adding the text into it.

fs.writeFileSync('./starter/txt/output.txt', textAdded);
console.log("File added with text");

