var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const {connectDB} = require('./config/db.config')
connectDB();

const cors = require('cors')
const todosRoutes = require('./routes/todos.routes')
const articlesRoutes = require('./routes/articles.routes')
const usersRoutes = require('./routes/auth.routes');
const { AuthRequest } = require('./middleware/auth.request.middleware');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/articles', AuthRequest, articlesRoutes);
app.use('/todos', AuthRequest, todosRoutes)
app.use('/auth', usersRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
