const Sales = require("./../Models/Sales");
const Product = require("./../Models/Products");
const reportsRouter = require("express").Router();

reportsRouter.get("/generalDataReportPerMonth", async (req, res) => {
  
  try {
    const { year, month } = req.query;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
    const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

    const generalDataReportPerMonth = await Sales.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq:  [{ $year: { $toDate: "$createdAt" } }, yearValue] },
              { $eq: [{ $month: { $toDate: "$createdAt" } }, monthValue] },
            ],
          },
        },
      },
      {
        $unwind: "$products"
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total" },
          bestSeller: { $max: "$vendor" },
          bestCustomer: { $max: "$client" },
          bestSellingProduct: { $max: "$products" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
  
    if (generalDataReportPerMonth.length === 0) {
      return res.status(404).json({ error: "No sales found for the specified month and year" });
    }
  
    const report = generalDataReportPerMonth[0];
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred on the server" });
  }
})

reportsRouter.get("/sellersReportMonthly", async (req, res) => {
  
  try {
    const { page,year, month } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 6,
      sort: { createdAt: -1 },
      customLabels: { docs: "users", totalDocs: "count" }
    };
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
    const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

    const totalSalesVendors = await Sales.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq:  [{ $year: { $toDate: "$createdAt" } }, yearValue] },
              { $eq: [{ $month: { $toDate: "$createdAt" } }, monthValue] },
            ],
          }, 
        }
      },
      {
        $group: {
          _id: "$vendor",
          totalSales: { $sum: 1 },
        }
      },
      {
        $project: {
          "_id": 0,
          "vendor": "$_id",
          "totalSales": 1,
        },
      },
    ])
    let result = await Sales.aggregatePaginate(totalSalesVendors, options);

    res.status(200).json(result);
  } catch (error) {
    throw new Error(error);
  }
})

reportsRouter.get('/salesPerCategory', async (req, res) => {
  try {
    const { year, month } = req.query;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
    const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

    const salesPerCategory = await Sales.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq:  [{ $year: { $toDate: "$createdAt" } }, yearValue] },
              { $eq: [{ $month: { $toDate: "$createdAt" } }, monthValue] },
            ],
          }, 
        }
      },
      {
        $unwind: {
          path: "$products",
          includeArrayIndex: "productIndex"
        }
      },
      {
        $addFields: {
          convertedProductId: {
            $toObjectId: "$products"
          }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "convertedProductId",
          foreignField: "_id",
          as: "productData"
        }
      },
      {
        $unwind: "$productData"
      },
      {
        $group: {
          _id: "$productData.category",
          totalSales: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalSales: 1
        }
      }
    ]);

    const allCategories = await Product.distinct("category");
    const totalSalesPerCategory = {};


    allCategories.forEach(category => {
      totalSalesPerCategory[category] = 0;
    });


    salesPerCategory.forEach(categorySales => {
      totalSalesPerCategory[categorySales.category] = categorySales.totalSales;
    });

    const results = [];
    allCategories.forEach(category => {
      results.push({
        category: category,
        totalSales: totalSalesPerCategory[category]
      });
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

reportsRouter.get("/salesPerDay", async (req, res) => {
  try {
    let fields = {};
    for (let field in req.query) {
      if (req.query[field]) {
        fields[field] = req.query[field];
      }
    }
    const { year, month, day } = fields;
    const options = {page: parseInt(fields.page) || 1, limit: parseInt(fields.limit) || 6};

    let newAggregate = Sales.aggregate();
    if (day && month && year) {
      newAggregate.match({
        createdAt: {
          $gte: new Date(year, month - 1, day),
          $lt: new Date(year, month - 1, day + 1)
        }
      }).group({
        _id: {
          day: { $dayOfMonth: "$createdAt" }
        },
        totalSales: { $sum: "$total" }
      });
    }
    let result = await Sales.aggregatePaginate(newAggregate, options);
    return res.status(200).json(result);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(405).json({error: error.name, message: error.message});
  }
});

reportsRouter.get("/salesPerClients", async (req, res) => {
  try {
    let fields = {};
    for (let field in req.query) {
      if (req.query[field]) {
        fields[field] = req.query[field];
      }
    }
    const { year, month } = fields;
    const options = {page: parseInt(fields.page) || 1, limit: parseInt(fields.limit) || 10};

    let newAggregate = Sales.aggregate();
    if (month && year) {
      newAggregate.match({
        createdAt: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1)
        }
      }).group({
        _id: "$client",
        totalSales: { $sum: "$total" }
      }).sort({
        totalSales: -1
      });
    } else if (year) {
      newAggregate.match({
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lt: new Date(year + 1, 0, 1)
        }
      }).group({
        _id: "$client",
        totalSales: { $sum: "$total" }
      }).sort({
        totalSales: -1
      });
    }
    let result = await Sales.aggregatePaginate(newAggregate, options);
    return res.status(200).json(result);
  } catch (error) {
     console.error(`${error.name}: ${error.message}`);
     return res.status(405).json({error: error.name, message: error.message});
  }
});

reportsRouter.get("/salesPerProducts", async (req, res) => {
  try {
    let fields = {};
    for (let field in req.query) {
      if (req.query[field]) {
        fields[field] = req.query[field];
      }
    }
    const { year, month } = fields;
    const options = {page: parseInt(fields.page) || 1, limit: parseInt(fields.limit) || 10};

    let newAggregate = Sales.aggregate();
    if (month && year) {
      newAggregate.match({
        createdAt: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1)
        }
      }).unwind(
        "$products"
      ).group({
        _id: "$products",
        totalSales: { $sum: "$total" }
      }).sort({
        totalSales: -1
      });
    } else if (year) {
      newAggregate.match({
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lt: new Date(year + 1, 0, 1)
        }
      }).unwind(
        "$products"
      ).group({
        _id: "$products",
        totalSales: { $sum: "$total" }
      }).sort({
        totalSales: -1
      });
    }
    let result = await Sales.aggregatePaginate(newAggregate, options);
    return res.status(200).json(result);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
    return res.status(405).json({error: error.name, message: error.message});
  }
});


module.exports = reportsRouter;