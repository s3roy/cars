const express = require("express");
const db = require("../db/connection");

const router = express.Router();

// Fetch all cars
router.get("/", async (req, res) => {
  try {
    const [cars] = await db.query("SELECT * FROM cars");
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new car
router.post("/", async (req, res) => {
  const { name, brand, price, engine_type, transmission, seats } = req.body;

  try {
    await db.query(
      "INSERT INTO cars (name, brand, price, engine_type, transmission, seats) VALUES (?, ?, ?, ?, ?, ?)",
      [name, brand, price, engine_type, transmission, seats]
    );
    res.status(201).json({ message: "Car added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
