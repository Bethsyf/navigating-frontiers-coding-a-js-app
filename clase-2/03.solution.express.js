import express from 'express';

const PORT = 3000;
const app = express();

let counterA = 0;
let counterB = 0;

app.use(express.json());

app.get('/counterA', (req, res) => {
  const resBody = { counterA };
  res.status(200).json(resBody);
});

app.get('/counterB', (req, res) => {
  const resBody = { counterB };
  res.status(200).json(resBody);
});

app.post('/counterA', (req, res) => {
  counterA += parseInt(req.body.increment);
  const resBody = { counterA };
  res.status(200).json(resBody);
});

app.post('/counterB', (req, res) => {
  counterB += parseInt(req.body.increment);
  const resBody = { counterB };
  res.status(200).json(resBody);
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT} 🚀`);
});
