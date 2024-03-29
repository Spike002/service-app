const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/User')
require('./services/passport');


const authRoutes = require('./routes/authRoutes');
const app = express();

//Set cookie for 30days
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app)

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })



const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Server is starting...');
