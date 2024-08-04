const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header');
  next();
});

// Endpoints for requests
app.get('/simple-request', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'simple_request.html'));
});

app.get('/preflight-request', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'preflight_request.html'));
});

app.listen(4000, () => {
  console.log('Server is running on port 4000.');
});
