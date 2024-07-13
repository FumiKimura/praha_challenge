const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  const response = { text: 'hello world' };
  res.status(200).send(JSON.stringify(response));
});

app.post('/', (req, res) => {
  const headers = req.headers;

  if (headers['content-type'] !== 'application/json') {
    res.status(400);
    res.send('Header is not application/json');
  } else {
    res.status(201).send(JSON.stringify(req.body));
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
