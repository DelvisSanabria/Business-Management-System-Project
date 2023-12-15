const { find, findByIdAndUpdate, deleteOne } = require("../Models/Users");
const UserSchema = require("./../Models/Users");
const routerUsers = require("express").Router();

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

routerUsers.get("/search", async (req, res) => {
  try {
    const name = req.query.term;
    let users = await find();
    users = users.filter(filterByTerm);
    let filteredUser = "";
    function filterByTerm(users) {
      if (
        users.filter((user) =>
          user.name.toLowerCase().includes(name.toLowerCase())
        )
      ) {
        return filteredUser;
      } else if (
        users.filter((user) =>
          user.email.toLowerCase().includes(email.toLowerCase())
        )
      ) {
        return filteredUser;
      } else if (
        users.filter((user) =>
          user.lastName.toLowerCase().includes(lastName.toLowerCase())
        )
      ) {
        return filteredUser;
      } else if (
        users.filter((user) =>
          user.phone.toLowerCase().includes(phone.toLowerCase())
        )
      ) {
        return filteredUser;
      } else if (
        users.filter((user) =>
          user._id.toLowerCase().includes(_id.toLowerCase())
        )
      ) {
        return filteredUser;
      } else {
        throw new Error("User not found");
      }
    }
    filterByTerm(users);
    res.json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.get("/:email", async (req, res) => {
  try {
    let user = await find({ email: req.params.email });
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
      const updated = await findByIdAndUpdate(usEmail, newData, { new: true });
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

routerUsers.delete("/:email", async (req, res) => {
  try {
    const deleted = await deleteOne({ email: req.params.email });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = routerUsers;