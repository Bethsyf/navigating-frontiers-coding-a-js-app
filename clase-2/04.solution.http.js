import http from 'http';

const PORT = 3000;
const ShoppingList = ['Milk', 'Bread', 'Eggs', 'Tomatoes'];

const server = http.createServer((req, res) => {
  let reqBody = '';
  req.on('data', (chunk) => {
    reqBody += chunk;
  });

  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/shopping-list') {
      const resBody = ShoppingList;
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(resBody));
    }

    if (req.method === 'POST' && req.url === '/shopping-list') {
      const item = JSON.parse(reqBody);
      if (!item || !item.item) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ error: "Bad Request: missing 'item' property" })
        );
        return;
      }

      if (ShoppingList.includes(item.item)) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Item already exists in the list' }));
        return;
      }
      ShoppingList.push(item.item);
      const resBody = item;
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(resBody));
    }
    if (!res.headersSent) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Node HTTP server running at http://localhost:${PORT} 🚀`);
});
