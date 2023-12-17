const SaleSchema = require("./../Models/Sales");
const reportsRouter = require("express").Router();

reportsRouter.get("/:year/:month", async (req, res) => {
  
  try {
    const year = req.params.year;
    const month = req.params.month;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
    const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

    const generalDataReportPerMonth = await SaleSchema.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, yearValue] },
              { $eq: [{ $month: "$createdAt" }, monthValue] },
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
          totalSales: { $sum: 1 },
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
  
    if (reportData.length === 0) {
      return res.status(404).json({ error: "No sales found for the specified month and year" });
    }
  
    const report = generalDataReportPerMonth[0];
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred on the server" });
  }
})

reportsRouter.get("/sellersReportMonthly/:year/:month", async (req, res) => {
  
  try {
    const year = req.params.year;
    const month = req.params.month;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
    const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

    const totalSalesVendors = await SaleSchema.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, yearValue] },
              { $eq: [{ $month: "$createdAt" }, monthValue] },
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
    res.status(200).json(totalSalesVendors);
  } catch (error) {
    throw new Error(error);
  }
})

reportsRouter.get("/sellersForCategoryReportMonthly/:year/:month", async (req, res) => {
  try {
    const year = req.params.year;
    const month = req.params.month;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
    const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

    const totalSalesForCategory = await SaleSchema.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, yearValue] },
              { $eq: [{ $month: "$createdAt" }, monthValue] },
            ],
          }, 
        }
      },
      {
        $unwind: "$products"
      },
      { $lookup: 
        { 
          from: "ProductSchema", localField: "products", foreignField: "_id", as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $group: 
        { 
          _id: "$product.category", 
          totalSales: { $sum: 1 } 
        }
      },
      {
        $project: {
          "_id": 0,
          "category": "$_id",
          "totalSales": 1,
        },
      },
    ])
    res.status(200).json(totalSalesForCategory);
  } catch (error) {
    throw new Error(error);
  }
})

module.exports = reportsRouter;