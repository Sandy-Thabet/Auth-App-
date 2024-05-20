const bcrypt = require('bcryptjs');

const users = {};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (!user) {
    return res.redirect('/login');
  }

  const isTrue = await bcrypt.compare(password, user.password);
  if (isTrue) {
    req.session.username = username;
    req.session.email = user.email;
    return res.redirect('/profile');
  }

  res.redirect('/login');
};

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body;
  if (users[username]) {
    return res.redirect('/signup');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { email, password: hashedPassword };
  res.redirect('/login');
};

exports.getProfile = (req, res) => {
  if (req.session.username) {
    res.render('profile', {
      username: req.session.username,
      email: req.session.email,
    });
  } else {
    res.redirect('/login');
  }
};
