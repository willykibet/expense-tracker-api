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

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      expense: expense,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid expense ID",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try{
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!expense){
      return res.status(404).json({
        message : "Expense not Found",
      });
    }res.status(200).json({
      message: "Exepense was Updates successfully",
      expense : expense,
    });
  } catch (error) {
    res.status(400).json({
      message : "Invalid Expense ID",
      error : error.message,
    });
  }
});



module.exports = router;
