import http from 'http';

const PORT = 3000;

let counterA = 0;
let counterB = 0;

const server = http.createServer((req, res) => {
  let reqBody = '';
  req.on('data', (chunk) => {
    reqBody += chunk;
  });

  req.on('end', () => {
    //GET
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.end(
        'Hola, este es el server3.\nPara acceder al contador A: /counterA\nPara acceder al contador B: /counterB'
      );
    }
    if (req.method === 'GET' && req.url === '/counterA') {
      const resBody = { counterA };

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(resBody));
    }

    if (req.method === 'GET' && req.url === '/counterB') {
      const resBody = { counterB };

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(resBody));
    }

    if (req.method === 'POST' && req.url === '/counterA') {
      counterA += parseInt(JSON.parse(reqBody).increment);
      const resBody = { counterA };

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(resBody));
    }

    if (req.method === 'POST' && req.url === '/counterB') {
      counterB += parseInt(JSON.parse(reqBody).increment);
      const resBody = { counterB };

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(resBody));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Node HTTP server running at http://localhost:${PORT} 🚀`);
});
