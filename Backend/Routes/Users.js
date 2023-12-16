const mongoose = require("mongoose"); 
const UserSchema = require("./../Models/Users");
const routerUsers = require("express").Router();
const ObjectId = mongoose.Types.ObjectId;

routerUsers.get("/", async (req, res) => {
  try {
    const { page, limit, orderBy } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6,
    };
    let users = await UserSchema.paginate({}, options);
    if (orderBy) {
      users = users.sort({ [orderBy]: -1 });
    }
    const results = users;
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.get("/allUsers", async (req, res) => {
  try {
    const { orderBy } = req.query;
    let users = [];

    if (orderBy) {
      users = await UserSchema.find().sort({ [orderBy]: -1 });
    } else {
      users = await UserSchema.find();
    }

    const results = users;
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.get("/search", async (req, res) => {
  try {
    const userData = req.query.term;
    let filteredUser = [];
    if (ObjectId.isValid(userData)) {
      filteredUser = await UserSchema.find({ _id: new ObjectId(userData) });
    } else {
      filteredUser = await UserSchema.find({
        $or: [
          { name: userData.toLocaleLowerCase() },
          { lastName: userData.toLocaleLowerCase() },
          { email: userData.toLocaleLowerCase() },
          { phone: userData}
        ]
      });
    }
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.get("/:email", async (req, res) => {
  try {
    let user = await UserSchema.findOne({ email: req.params.email });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.post("/", async (req, res) => {
  try {
    let user = new UserSchema(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.patch("/:email", async (req, res) => {
  try {
    const usEmail = req.params.email;
    const newData = req.body;

    try {
      const updated = await UserSchema.findOneAndUpdate({ email: usEmail }, newData, { new: true });
      res.json(updated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.patch("/:email/deleted", async (req, res) => {
  try {
    const usEmail = req.params.email;
  
    try {
      const updated = await UserSchema.findOneAndUpdate({ email: usEmail }, { deleted: true }, { new: true });
      
      if (!updated) {
        return res.status(404).json({ message: 'User not was updated' });
      }
      
      res.json(updated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = routerUsers;