const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockSchema = new Schema({
  product: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
    unique: true,
  },

  quantity: {
    type: String,
    required: true,
  },

  idReference: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock, stockSchema };
