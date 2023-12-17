const UserSchema = require("./../Models/Users");
const SaleSchema = require("./../Models/Sales");
const reportsRouter = require("express").Router();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

const yearValue = typeof year !== 'undefined' ? parseInt(year) : currentYear;
const monthValue = typeof month !== 'undefined' ? parseInt(month) : currentMonth;

reportsRouter.get("/", async (req, res) => {
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
          totalSales: { $sum: "$amount" },
        }
      }
    ])
    res.status(200).json(results);
  } catch (error) {
    throw new Error(error);
  }
})