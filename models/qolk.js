'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QolkSchema = new Schema({
  humidity: Number,
  temperature: Number,
  alcohol: Number,
  date: Date
}, {
  collection: 'Qolk'
});

module.exports = mongoose.model('Qolk', QolkSchema);
