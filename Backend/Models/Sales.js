const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const SaleSchema = mongoose.Schema(
  {
    client: {
      type: String,
      required: true,
    },
    vendor: {
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  products: {
    type: [String],
    min: 0,
    required: true,
  },
  total: {
    type: Number,
    required: true
  },
  iva: {
    type: Number,
    required: true
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

SaleSchema.pre("save", function (next) {
  this.updateAt = new Date();
  next();
})

SaleSchema.plugin(mongoosePaginate);
SaleSchema.plugin(aggregatePaginate);

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
