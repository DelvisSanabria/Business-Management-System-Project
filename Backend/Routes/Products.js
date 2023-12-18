const productRouter = require("express").Router();
const { Products } = require("../Model/Products");
const multer = require("multer");
const domain = process.env.DOMAIN || "http://localhost:3000";

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "./images/products");
   },
   filename: (req, file, callback) => {
      callback(null, `${Date.now()} - ${file.originalname}`);
   }
});

const upload = multer({ storage: storage });

productRouter.get("/", async (req, res) => {
   try {
      const {page, limit, search} = req.query;
      const options = {page: parseInt(page) || 1, limit: parseInt(limit) || 10};
      let find = {Deleted: false};
      if (search) {
         find = {
            $or: [
               { name: { $regex: search, $options: "i" } },
               { category: { $regex: search, $options: "i" } },
               { description: { $regex: search, $options: "i" } }
            ],
            Deleted: false
         };
      }
      const products = await Products.paginate(find, options);
      return res.status(200).json(products);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(405).json({name: error.name, message: error.message});
   }
});

productRouter.post("/", upload.single("Image"), async (req, res) => {
   try {
      let product = new Products(req.body);
      if (req.file) {
         product.ImageURL = `${domain}/images/products/${req.file.filename}`;
      }
      await product.save();
      return res.status(201).json(product);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(500).json({ name: error.name, message: error.message });
   }
});

//Ruta para recuperar los productos del carrito
productRouter.post("/cart", async (req, res) => {
   let { ProductIds } = req.body;
   try {
      let products = await Products.find({ _id: {$in: ProductIds}});
      if (products) {
         return res.status(200).json(products);
      } else {
         return res.status(404).json({error: "No products found"});
      }
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({name: error.name, message: error.message});
   }
});

productRouter.patch("/:id", async (req, res) => {
   try {
      let product = await Products.findById(req.params.id);
      if (product) {
         Object.assign(product, req.body);
         await product.save();
         return res.json(product);
      }
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({name: error.name, message: error.message});
   }
});

productRouter.delete("/:id", async (req, res) => {
   try {
      let productDeleted = await Products.deleteOne({_id:req.params.id});
      return res.json(productDeleted);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({name: error.name, message: error.message})
   }
});

productRouter.delete("/", async (req, res) => {
   try {
      let productDeleted = await Products.deleteMany({});
      return res.json(productDeleted);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({name: error.name, message: error.message})
   }
});

module.exports = productRouter;