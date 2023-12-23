const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    minlength: 50,
    maxlength: 600,
    required: true,
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    type: String,
    minlength: 50,
    maxlength: 400,
    required: true,
  },
  category: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required:true
  },
  updateAt: {
    type: Date,
    default: Date.now,
    required:true
  }
});

ProductSchema.pre("save", function (next) {
  this.updateAt = new Date();
  next();
});

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;