const productRouter = require("express").Router();
const Product = require("../Models/Products");
const multer = require("multer");
const domain = process.env.DOMAIN || "http://localhost:3000";

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "./images/products");
   },
   filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
   }
});

const upload = multer({ storage: storage });

//Rutas GET

productRouter.get("/", async (req, res) => {
   try {
      let fields = {};
      for (let field in req.query) {
         if (req.query[field]) {
            fields[field] = req.query[field];
         }
      }
      const options = {page: parseInt(fields.page) || 1, limit: parseInt(fields.limit) || 6};
      let query = {deleted: false};
      if (fields.search) {
         const search = fields.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
         query = {
            ...query,
            $or: [
               { name: { $regex: search, $options: "i" } },
               { category: { $regex: search, $options: "i" } },
               { description: { $regex: search, $options: "i" } }
            ]
         };
      }
      const products = await Product.paginate(query, options);
      return res.status(200).json(products);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(405).json({name: error.name, message: error.message});
   }
});

//Rutas POST

productRouter.post("/", upload.single("image"), async (req, res) => {
   try {
      let product = new Product(req.body);
      if (req.file) {
         product.imageURL = `${domain}/images/products/${req.file.filename}`;
      }
      await product.save();
      return res.status(201).json(product);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(500).json({ name: error.name, message: error.message });
   }
});

productRouter.post("/cart", async (req, res) => {
   let { products } = req.body;
   try {
      const product = await Product.find({_id: {$in: products}});
      if (product) {
         return res.status(200).json(product);
      } else {
         return res.status(404).json({error: "No se encontraron productos"});
      }
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({name: error.name, message: error.message});
   }
});

//Rutas PATCH

productRouter.patch("/", async (req, res) => {
   try {
      let fields = {};
      for (let field in req.body) {
         if (req.body[field]) {
            fields[field] = req.body[field];
         }
      }
      const product = await Product.findById(fields.Id);
      if (!product) {
         return res.status(404).json({ error: "Producto no encontrado" });
      }
      //SOFT Delete
      if (fields.deleted) {
         product.deleted = fields.deleted;
         await product.save();
         return res.status(202).json(product);
      }
      let errors = {};
      for (const field in fields) {
         if (fields[field] === product[field]) {
            errors[field] = "El nuevo valor debe ser distinto del anterior";
         }
      }
      if (Object.keys(errors).length > 0) {
         return res.status(400).json(errors);
      }
      Object.assign(product, fields);
      await product.save();
      return res.status(202).json(product);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(500).json({name: error.name, message: error.message});
   }
});

//Rutas DELETE para las pruebas en la base de datos

productRouter.delete("/:id", async (req, res) => {
   try {
      let productDeleted = await Product.deleteOne({_id: req.params.id});
      return res.json(productDeleted);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({name: error.name, message: error.message})
   }
});

productRouter.delete("/", async (req, res) => {
   try {
      let productDeleted;
      if (Object.keys(req.query).length > 0) {
         productDeleted = await Product.deleteMany(req.query);
      } else {
         productDeleted = await Product.deleteMany({});
      }
      return res.json(productDeleted);
   } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      return res.status(404).json({name: error.name, message: error.message})
   }
});

module.exports = productRouter;