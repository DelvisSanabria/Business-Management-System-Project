const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    minlength: 1,
    maxlength: 1000,
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  price: {
    type: Number,
    min: 0.01,
    required: true
  },
  stock: {
    type: Number,
    min: 1,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 2000,
    required: true
  },
  category: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
