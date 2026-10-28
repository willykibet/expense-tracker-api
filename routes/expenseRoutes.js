const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();


router.post("/",async (req,res) => {  
    
    try {
           console.log("Request body:", req.body);
        const expense = await Expense.create(req.body); 
        res.status(201).json({
            message : "Expense created successfully",
            expense : expense,
        })
    } catch (error) {
        res.status(500).json({
            message : "Failed to create expense",
            error : error.message,
        })
    }

});


router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    res.status(200).json({
      count: expenses.length,
      expenses: expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
});


module.exports = router;
