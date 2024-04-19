import express from 'express';

const PORT = 3000;

const app = express();

const ShoppingList = ['Milk', 'Bread', 'Eggs', 'Tomatoes'];

app.use(express.json());

app.get('/shopping-list', (req, res) => {
  const resBody = ShoppingList;
  res.status(200).send(resBody);
});

app.post('/shopping-list', (req, res) => {
  const { item } = req.body;
  if (!item) {
    res.status(400).send({ error: "Bad Request: missing 'item' property" });
    return;
  }
  if (ShoppingList.includes(item)) {
    res.status(409).send({ error: 'Item already exists in the list' });
    return;
  }
  ShoppingList.push(req.body.item);
  const resBody = { item };
  res.status(201).send(resBody);
});

app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT} 🚀`);
});
