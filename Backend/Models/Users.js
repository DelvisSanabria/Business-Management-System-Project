import { Schema, model } from "mongoose";
const UserSchema = Schema({
  avatar: {
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
  lastName: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    minlength: 50,
    maxlength: 100,
    required: true,
  },
  phone: {
    type: String,
    minlength: 12,
    maxlength: 20,
    required: true,
  },
  address: {
    type: String,
    minlength: 100,
    maxlength: 400,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  role: {
    type: String,
    minlength: 5,
    maxlength: 100,
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
  }
});

UserSchema.pre('save', function (next) {
  this.updateAt = new Date();
  next();
});


const Users = model("Users", UserSchema);

export default Users