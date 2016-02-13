'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const controllers = require('controllers');

app.use(helmet());
app.use(cors({
  origin: '*',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const connect = () => {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  mongoose.connect('mongodb://localhost/qolk', options);
};
connect();
mongoose.connection.on('error', process.stdout);
mongoose.connection.on('connected', process.stdout);
mongoose.connection.on('disconnected', connect);
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

app.get('/', controllers.get);
app.post('/', controllers.post);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      error: err
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

module.exports = app;
