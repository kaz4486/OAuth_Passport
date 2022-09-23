const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
const isLoggedIn = require('./middleware/loginCheck');

const app = express();

app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

//init session mechanism
app.use(
  session({ secret: 'anything', resave: false, saveUninitialized: false })
);

//init passport
app.use(passport.initialize());
app.use(passport.session());

//stardard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

// const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');
// ...
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
