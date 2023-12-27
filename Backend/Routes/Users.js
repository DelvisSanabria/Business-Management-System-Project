const mongoose = require("mongoose");
const User = require("../Models/Users");
const routerUsers = require("express").Router();
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcryptjs");
const multer = require("multer");
const domain = process.env.DOMAIN || "http://localhost:3000";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images/users");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
  }
});

const upload = multer({ storage: storage });

routerUsers.get("/", async (req, res) => {
  try {
    const { page, limit, orderBy, role } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6
    };
    let query = { deleted: false };
    if (role === "vendors") {
      query = { ...query, role: "vendor" };
    } else if (role === "client") {
      query = { ...query, role: "client" };
    }
    let users = await User.paginate(query, options);
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

routerUsers.get("/allUsers/:role?", async (req, res) => {
  try {
    const { orderBy } = req.query;
    const { role } = req.params;

    let query = { deleted: false };

    if (role === 'vendors') {
      query = { ...query, role: 'vendor' };
    } else if (role === 'clients') {
      query = { ...query, role: 'client' };
    }

    let users = [];

    if (orderBy) {
      users = await User.find(query).sort({ [orderBy]: -1 });
    } else {
      users = await User.find(query);
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
      filteredUser = await User.find({ _id: new ObjectId(userData) });
    } else {
      filteredUser = await User.find({
        $or: [
          { name: userData.toLocaleLowerCase() },
          { lastName: userData.toLocaleLowerCase() },
          { email: userData.toLocaleLowerCase() },
          { phone: userData }
        ]
      });
    }
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.post("/signup", upload.single("avatar"), async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ email: "Correo ya registrado" });
    }
    else {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(req.body.password, salt);
      user = new User({ ...req.body, password: hash });
      if (req.file) {
        user.imageURL = `${domain}/images/users/${req.file.filename}`;
      }
      await user.save();
      return res.status(201).json(user);
    }
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(400).json({ name: error.name, message: error.message });
  }
});

routerUsers.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const { _id, firstname, lastname, email, role } = user;
        return res.status(200).json({ _id, firstname, lastname, email, role });
      } else {
        return res.status(406).json({ password: "La contraseña es incorrecta" });
      }
    } else {
      return res.status(404).json({ email: "Correo no registrado" });
    }
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(404).json({ name: error.name, message: error.message });
  }
});

routerUsers.patch("/:email", upload.single("avatar"), async (req, res) => {
  try {
    const usEmail = req.params.email;
    const newData = req.body;
    if (newData.password) {
      const match = await bcrypt.compare(password, newData.password);
      if (!match) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        newData.password = hash;
      } else {
        res.status(404).json(new Error('Wrong password cannot repeat same password'));
        return;
      }
      if (req.file) {
        newData.avatar = req.file.path;
      }
    }
    try {
      const updated = await User.findOneAndUpdate({ email: usEmail }, newData, { new: true });
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

routerUsers.patch("/:email/deleted", upload.single("avatar"), async (req, res) => {
  try {
    const usEmail = req.params.email;

    try {
      const updated = await User.findOneAndUpdate({ email: usEmail }, { deleted: true }, { new: true });

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