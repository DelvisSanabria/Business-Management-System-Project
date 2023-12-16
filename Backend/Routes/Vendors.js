const mongoose = require("mongoose"); 
const UserSchema = require("./../Models/Users");
const routerVendors = require("express").Router();
const ObjectId = mongoose.Types.ObjectId;

routerVendors.get("/", async (req, res) => {
  try {
    const { page, limit, orderBy } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6,
    };
    let vendors = await UserSchema.paginate({ role: "vendor" }, options);
    if (orderBy) {
      vendors = vendors.sort({ [orderBy]: -1 });
    }
    const results = vendors;
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerVendors.get("/allVendors", async (req, res) => {
  try {
    const { orderBy } = req.query;
    let vendors = [];

    if (orderBy) {
      vendors = await UserSchema.find({ role: "vendor" }).sort({ [orderBy]: -1 });
    } else {
      vendors = await UserSchema.find({ role: "vendor" });
    }

    const results = vendors;
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
routerVendors.get("/search", async (req, res) => {
  try {
    const vendorData = req.query.term;
    let filteredVendor = [];
    if (ObjectId.isValid(vendorData)) {
      filteredVendor = await UserSchema.find({ _id: new ObjectId(vendorData) });
    } else {
      filteredVendor = await UserSchema.find({
        $or: [
          { name: vendorData.toLocaleLowerCase() },
          { lastName: vendorData.toLocaleLowerCase() },
          { email: vendorData.toLocaleLowerCase() },
          { phone: vendorData}
        ]
      });
    }
    res.status(200).json(filteredVendor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerVendors.get("/:email", async (req, res) => {
  try {
    let vendor = await UserSchema.findOne({ email: req.params.email });
    res.json(vendor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerVendors.post("/", async (req, res) => {
  try {
    let vendor = new UserSchema(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerVendors.patch("/:email", async (req, res) => {
  try {
    const vendorEmail = req.params.email;
    const newData = req.body;

    try {
      const updated = await UserSchema.findOneAndUpdate({ email: vendorEmail }, newData, { new: true });
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

routerVendors.patch("/:email/deleted", async (req, res) => {
  try {
    const vendorEmail = req.params.email;
  
    try {
      const updated = await UserSchema.findOneAndUpdate({ email: vendorEmail }, { deleted: true }, { new: true });
      
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


module.exports = routerVendors;