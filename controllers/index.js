'use strict';

const mongoose = require('mongoose');
const Qolk = mongoose.model('Qolk');

const qolk = {
  update: (req, res) => {
    const qolk = new Qolk();
    qolk.date = new Date();
    qolk.temperature = req.body.temperature;
    qolk.humidity = req.body.humidity;
    qolk.alcohol = req.body.alcohol;
    qolk.save();
    res.status(200);
  },
  get: (req, res, next) => {
    Qolk.find({}, {}, {
      sort: {
        date: -1
      },
      limit: 1
    }, (err, qolk) => {
      if (err) {
        return next(err);
      }
      res.json(qolk);
    });
  }
};

module.exports = qolk;
