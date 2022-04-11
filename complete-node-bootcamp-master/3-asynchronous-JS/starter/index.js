const fs = require('fs');

const superagent = require('superagent');

// doing the same thing with promise

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('i could find that file ');
      resolve(data);
    });
  });
};

const writefilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write file ');
      resolve('success');
    });
  });
};

// doing same task with async/await promises.

const getDogPic = async () => {
  try {
    // this will read the file and give the data

    const data = await readFile(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    // this promise will give the image link of that particular dog mentioned the the file

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    // this will store the dog image in dog-img.txt

    await writefilePro('dog-img.txt', res.body.message);
    console.log('random dog image saved to file');
  } catch (err) {
    console.error(err);

    throw err;
  }

  return '2: dog pics';
};

// trying to understand the async nature with the console

console.log('1: will get dog pic');

getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics!');
  })
  .catch((err) => {
    console.log('ERROR');
  });

// calling readfile
/*
readFile(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed : ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writefilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('random dog image saved to file');
  })
  .catch((err) => {
    console.error(err.message);
  });

*/

// now reading the data async in the file system

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed : ${data}`);

//   // using get for the res from the API

//   // .get gives us a promise so we are applying .then on it

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('random dog image saved to file');
//       });
//     })
//     .catch((err) => {
//       console.error(err.message);
//     });
// });
