const express = require('express');
const app = express();
const allowedOrigin = 'http://localhost:4000';
// CORS middleware to handle preflight requests and set CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'null');
  }
  next();
});

// Define a simple POST route
app.post('/', (req, res) => {
  res.send('Hello from cross-domain server');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
