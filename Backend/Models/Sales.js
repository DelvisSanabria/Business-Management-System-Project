const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SaleSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  client: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  vendorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  vendor: {
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  productsID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Products',
    required: true
  },
  products: {
    type: [String],
    min: 0,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
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

SaleSchema.plugin(mongoosePaginate);

const Sales = mongoose.model("Sale", SaleSchema);

module.exports = Sales