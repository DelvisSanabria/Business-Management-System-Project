const UserSchema = require("./../Models/Users");
const SaleSchema = require("./../Models/Sales");
const reportsRouter = require("express").Router();

reportsRouter.get("/:year/:month", async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
  const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

  try {
    const results = await SaleSchema.aggregate([
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
          _id: null,
          totalSales: { $sum: 1 },
        }
      }
    ])
    res.status(200).json(results);
  } catch (error) {
    throw new Error(error);
  }
})