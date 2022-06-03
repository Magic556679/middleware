var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json')

let indexRouter = require('./routes/index');
let postsRouter = require('./routes/posts');
let usersRouter = require('./routes/users');

var app = express();
require('./connections/index');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

module.exports = app;
