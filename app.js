const express = require('express'); // returns a function
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// conntect to db
const dbURI = "MONGO_DB_URI_HERE";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Route handler
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.use('/blogs', blogRoutes);

// 404 Page this is gonna be executed only if code gets here if we send a response to the browser code will not reach here
app.use((req, res) => {
  res.status(404).render('404');
});
