const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const AuthRouter = require('./routes/auth-router');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: '4C731FAFF92B7EA24D2B6D5A7C5FF',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/', AuthRouter);

const port = 2303;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
