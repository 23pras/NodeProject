const fs =   require('fs');                     // fs is a module which have so many functions which we will be using. 
const http = require('http');                 // using http module
const url =  require('url');                   //

////////////////////////////////   FILES READ WRITE 

// const hello = "Hello World";
// console.log(hello);

// This readFileSync func is reading a files data from a location, blocking synchronus way.

const textIn = fs.readFileSync('./starter/txt/input.txt' , 'utf-8');
//console.log(textIn);


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

const textAdded = `this is about avocado : ${textIn}.\ncreated on ${dateTime}`;
//console.log(textAdded);

// This write fun is creating a file at a location and adding the text.

fs.writeFileSync('./starter/txt/output.txt', textAdded);
// console.log("File added with text");


// now making asynchronus, non-blocking JS

// fs.readFile('./starter/txt/start.txt','utf-8', (err, data1)=>{
//     if(err) return console.log("ERROR !!");


//     fs.readFile(`./starter/txt/${data1}.txt`,'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt','utf-8', (err, data3)=>{
//             console.log(data3);

//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err=>{
//                  console.log("your file has been written");
//             })
//         });
//     });
// });

// console.log("async function reading data..");   // this line will first execute


/////////////////////////   SERVER  responses on various requests using 'url' . 

const server = http.createServer((Request, Response)=>{
   // console.log(Request.url);
   const pathName = Request.url;
   
   if(pathName === '/' || pathName === '/overview'){
    Response.end("Hello Prashant this is OVERVIEWS response from the server !!!");
   } 
   
   else if(pathName === '/product'){
    Response.end("Hello Prashant This is Product response from the server !!!");
   }

   else{
    Response.writeHead(404, {
       'Content-type' : 'text/html',
       'my-own-header': 'hello-world'
    });

    Response.end("<h1>Page Not Found...</h1>");
   }

});

server.listen(8000, '127.0.0.1', ()=>{
    console.log("listening to port 8000....");
});

// till march 13 
