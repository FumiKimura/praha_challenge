const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(
  cookieSession({
    name: 'hoge.com',
    domain: 'localhost',
    keys: ['key1'],
    httpOnly: true,
    maxAge: 60,
  })
);

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/cookie-cat', (req, res) => {
  req.session.firstPartyCookie = 'first-party-cookie-value';
  res.sendFile(path.join(__dirname, 'public', 'cookie-cat.html'));
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
