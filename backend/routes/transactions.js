const express = require("express");
const db = require("../db/connection");

const router = express.Router();

// Book a test drive or buy a car
router.post("/", async (req, res) => {
  const { user_id, car_id, transaction_type } = req.body;

  try {
    await db.query(
      "INSERT INTO transactions (user_id, car_id, transaction_type) VALUES (?, ?, ?)",
      [user_id, car_id, transaction_type]
    );
    res.status(201).json({ message: `${transaction_type} successful` });
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
