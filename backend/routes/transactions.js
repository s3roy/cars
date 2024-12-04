const express = require("express");
const db = require("../db/connection");

const router = express.Router();

// Book a test drive or buy a car
// Add a transaction
router.post("/", async (req, res) => {
  const { user_id, car_id, transaction_type } = req.body;

  try {
    const booking_id = Math.random().toString(36).substr(2, 9).toUpperCase(); // Generate unique booking ID
    await db.query(
      "INSERT INTO transactions (user_id, car_id, transaction_type) VALUES (?, ?, ?)",
      [user_id, car_id, transaction_type]
    );
    res.status(201).json({
      message: "Transaction added successfully",
      booking_id: booking_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch transactions for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [transactions] = await db.query(
      "SELECT transactions.*, cars.name AS car_name, cars.brand AS car_brand FROM transactions JOIN cars ON transactions.car_id = cars.id WHERE user_id = ?",
      [userId]
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
