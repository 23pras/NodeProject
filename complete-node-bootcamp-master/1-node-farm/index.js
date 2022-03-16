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


/////////////////////////   SERVER  responses on various requests using 'url'

const replaceTemplate = (temp, product)=>{
   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
   output = output.replace(/{%IMAGE%}/g, product.image);
   output = output.replace(/{%PRICE%}/g, product.price);
   output = output.replace(/{%FROM%}/g, product.from);
   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
   output = output.replace(/{%QUANTITY%}/g, product.quantity);
   output = output.replace(/{%DESCRIPTION%}/g, product.description);
   output = output.replace(/{%ID%}/g, product.id);
   
   if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
   return output;

};

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8'); // reading temp-overview html for once.
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');    // reading the FILE DATA Only once.
const dataObj =  JSON.parse(data);



const server = http.createServer((Request, Response)=>{
   //console.log(Request.url);
   const { query, pathname } = url.parse(Request.url, true);  // by parse converting the url into object and taking 2 values from it.
  
   
  // Overview page
  if(pathname === '/' || pathname === '/overview'){

   Response.writeHead(200, {'Content-type' : 'text/html'});
   const cardsHtml = dataObj.map(ele => replaceTemplate(tempCard, ele)).join('');
   const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
   //console.log(output);
   Response.end(output);
   //Response.end("Hello Prashant this is OVERVIEWS response from the server !!!");
   } 

   // Product page 
   else if(pathname === '/product'){
   //console.log(query);
   Response.writeHead(200, {'Content-type' : 'text/html'});
   const product = dataObj[query.id];    // getting the requested url product from the dataObj. 
   const output = replaceTemplate(tempProduct, product);
   Response.end(output);
   }
   
   // API 
   else if(pathname === '/api'){

//  here the readfile is reading the file everytime api hits, not good practise.

//    fs.readFile(`${__dirname}/starter/dev-data/data.json`, 'utf-8', (err, data)=>{
//       const productData =  JSON.parse(data);
//       //console.log(productData);

      Response.writeHead(200, {'Content-type' : 'application/json'});

      Response.end(data);

   //});
   
   }
  
   // NOT FOUND 
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
