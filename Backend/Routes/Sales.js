const saleRouter = require("express").Router();
const { Sales } = require("../Models/Sales");
const { Products } = require("../Models/Products");
const { Users } = require("../Models/Users");

saleRouter.get("/", async (req, res) => {
   try {
      const {page, limit, search} = req.query;
      const options = {page: parseInt(page) || 1, limit: parseInt(limit) || 10};
      let find = { Deleted: false };
      if (search) {
         find = {
            $or: [
               { client: { $regex: search, $options: "i" } },
               { vendor: { $regex: search, $options: "i" } },
               { products: { $regex: search, $options: "i" } },
            ],
            Deleted: false
         };
      }
      const sale = await Sales.paginate(find, options);
      return res.status(200).json(sale);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(405).json({error: error.name, message: error.message});
   }
});

saleRouter.post("/", async (req, res) => {
   try {
      const { clientID, vendorID, productsID} = req.body;
      const client = await Users.findById(clientID);
      const products = await Products.find({_id: { $in: productsID }});
      let sale = new Sales({
         ...req.body, 
         client: client.client,
         vendor: "N/A",
         products: products.map(product => product.Name)
      });
      if (vendorID) {
         const vendor = await Users.findById(vendorID);
         sale.Vendor = `${vendor.Firstname} ${vendor.Lastname}`;
      }
      await sale.save();
      return res.status(201).json(sale);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(400).json({ error: error.name, message: error.message });
   }
});

saleRouter.patch("/:id", async (req, res) => {
   try {
      let sale = await Sales.findById(req.params.id);
      if (sale) {
         Object.assign(sale, req.body);
         await sale.save();
         return res.json(sale);
      }
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({error: error.name, message: error.message});
   }
});

saleRouter.delete("/:id", async (req, res) => {
   try {
      let saleDeleted = await Sales.deleteOne({_id:req.params.id});
      return res.json(saleDeleted);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({error: error.name, message: error.message})
   }
});

saleRouter.delete("/", async (req, res) => {
   try {
      let saleDeleted = await Sales.deleteMany({});
      return res.json(saleDeleted);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({error: error.name, message: error.message})
   }
});

module.exports = saleRouter;