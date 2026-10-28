
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/expenses",expenseRoutes);



// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Expense Tracker API is running",
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
