const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const app = express();
const port = 4000;

app.use(express.static('public'));
app.use(
  cookieSession({
    name: 'hoge.com',
    domain: 'ngrok-free.app',
    keys: ['key1'],
    httpOnly: true,
    maxAge: 60,
  })
);

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/cookie-cat-image', (req, res) => {
  req.session.firstPartyCookie = 'third-party-cookie-value';
  res.sendFile(
    path.join(__dirname, 'public', 'cat_with_third_party_cookie.jpg')
  );
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
