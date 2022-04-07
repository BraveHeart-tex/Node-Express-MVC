const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello');
  });
  greet();

  // set header content type
  res.setHeader('Content-Type', 'text/html');

  let path = './views/';
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });

  // BAD WAY X
  // res.write('<head><link rel="stylesheet" href="#" /></head>');
  // res.write('<p>hello world!</p>');
  // res.end();
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});

// localhost is like a domain name on the web
// port numbers are like 'doors' into a computer

// 200 OK
// 301 Resource moved
// 404 not found
// 500 internal server error
