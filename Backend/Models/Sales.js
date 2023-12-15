const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const SaleSchema = new mongoose.Schema({
  client: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  vendor: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  products: {
    type: Array,
    min: 0,
    required: true,
  },
  total: {
    type: Number,
    min: 0,
    required: true,
  },
  iva: {
    type: Number,
    min: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required:true
  },
  updateAt: {
    type: Date,
    default: Date.now(),
    required:true
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true
  }
});

SaleSchema.pre('save', function (next) {
  this.updateAt = new Date();
  next();
});

const Sales = mongoose.model("Sale", SaleSchema);

module.exports = Sales