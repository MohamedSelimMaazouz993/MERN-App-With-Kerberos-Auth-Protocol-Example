const express = require('express');
const app = express();
const mongoose = require('mongoose');
const krb5 = require('krb5');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configure Kerberos
// MSM = MohamedSelimMaazouz
krb5.realm = 'MSM.COM';
krb5.kdc = 'kdc.MSM.com';
krb5.keytabPath = '/path/to/keytab/file';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/kerberos_selim', { useNewUrlParser: true });

// Define the user model
const User = mongoose.model('User', {
  username: String,
  password: String
});

// Configure passport to use the local strategy
passport.use(new LocalStrategy((username, password, done) => {
  // Authenticate the user using Kerberos
  krb5.authenticate(username, password, (err, result) => {
    if (err) {
      console.error(err);
      done(err);
    } else {
      // Check if the user exists in the database
      User.findOne({ username }, (err, user) => {
        if (err) {
          console.error(err);
          done(err);
        } else if (!user) {
          // Create a new user in the database
          const newUser = new User({ username });
          newUser.save((err) => {
            if (err) {
              console.error(err);
              done(err);
            } else {
              done(null, newUser);
            }
          });
        } else {
          done(null, user);
        }
      });
    }
  });
}));

// Configure passport to use the user ID for serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Configure passport to use the user ID for deserialization
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Configure session middleware
app.use(session({
  secret: 'myappsecret',
  resave: false,
  saveUninitialized: false
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up the login endpoint
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Return the session information to the client
  res.json(req.user);
});

// Set up the logout endpoint
app.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
